begin;

create extension if not exists pgcrypto;

create type public.app_role as enum ('owner','admin','manager','reviewer','teacher','support','billing');
create type public.membership_status as enum ('invited','active','suspended','removed');
create type public.knowledge_status as enum ('draft','review','published','archived');
create type public.request_status as enum ('draft','submitted','in_progress','review','delivered','cancelled');

alter table public.profiles
  add column if not exists display_name text,
  add column if not exists phone text,
  add column if not exists state_code text,
  add column if not exists city text,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  legal_name text,
  tax_id text,
  state_code text,
  city text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'teacher',
  status public.membership_status not null default 'active',
  created_at timestamptz not null default now(),
  primary key (organization_id,user_id)
);

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  school_code text,
  network text,
  state_code text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id,school_code)
);

create table if not exists public.curricula (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  jurisdiction text not null,
  state_code text,
  municipality text,
  version text not null,
  valid_from date,
  valid_until date,
  source_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(name,jurisdiction,version)
);

create table if not exists public.curriculum_skills (
  id uuid primary key default gen_random_uuid(),
  curriculum_id uuid not null references public.curricula(id) on delete cascade,
  code text not null,
  education_stage text not null,
  school_year text,
  subject text not null,
  description text not null,
  knowledge_object text,
  competency text,
  metadata jsonb not null default '{}'::jsonb,
  unique(curriculum_id,code)
);

create table if not exists public.knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_type text not null,
  jurisdiction text,
  issuing_body text,
  source_url text,
  drive_file_id text,
  published_on date,
  valid_from date,
  valid_until date,
  version text,
  status public.knowledge_status not null default 'draft',
  checksum text,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.knowledge_sources(id) on delete cascade,
  position integer not null,
  heading text,
  content text not null,
  token_count integer,
  metadata jsonb not null default '{}'::jsonb,
  unique(source_id,position)
);

create table if not exists public.product_types (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  schema_version integer not null default 1,
  input_schema jsonb not null default '{}'::jsonb,
  output_schema jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.document_templates (
  id uuid primary key default gen_random_uuid(),
  product_type_id uuid not null references public.product_types(id),
  organization_id uuid references public.organizations(id) on delete cascade,
  name text not null,
  version integer not null default 1,
  structure jsonb not null,
  header_asset_path text,
  footer_asset_path text,
  watermark_asset_path text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(product_type_id,organization_id,name,version)
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  school_id uuid references public.schools(id) on delete set null,
  requester_id uuid not null references auth.users(id),
  product_type_id uuid not null references public.product_types(id),
  curriculum_id uuid references public.curricula(id),
  status public.request_status not null default 'draft',
  title text,
  input_data jsonb not null default '{}'::jsonb,
  due_at timestamptz,
  submitted_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.documents
  add column if not exists request_id uuid references public.service_requests(id) on delete set null,
  add column if not exists owner_id uuid references auth.users(id) on delete cascade,
  add column if not exists organization_id uuid references public.organizations(id) on delete cascade,
  add column if not exists version integer not null default 1,
  add column if not exists metadata jsonb not null default '{}'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.ai_generations (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.service_requests(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  provider text not null,
  model text not null,
  prompt_version text not null,
  input_hash text,
  status text not null,
  input_tokens integer,
  output_tokens integer,
  cost_micros bigint,
  latency_ms integer,
  error_code text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists organization_members_user_idx on public.organization_members(user_id,status);
create index if not exists schools_organization_idx on public.schools(organization_id);
create index if not exists curriculum_skills_lookup_idx on public.curriculum_skills(curriculum_id,subject,school_year);
create index if not exists knowledge_sources_status_idx on public.knowledge_sources(status,jurisdiction);
create index if not exists service_requests_requester_idx on public.service_requests(requester_id,status,created_at desc);
create index if not exists documents_owner_idx on public.documents(owner_id,created_at desc);
create index if not exists ai_generations_request_idx on public.ai_generations(request_id,created_at desc);

create or replace function public.is_org_member(target_org uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists (
    select 1 from public.organization_members m
    where m.organization_id=target_org and m.user_id=auth.uid() and m.status='active'
  );
$$;

create or replace function public.has_org_role(target_org uuid, allowed public.app_role[])
returns boolean language sql stable security definer set search_path=public as $$
  select exists (
    select 1 from public.organization_members m
    where m.organization_id=target_org and m.user_id=auth.uid() and m.status='active' and m.role=any(allowed)
  );
$$;

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.schools enable row level security;
alter table public.curricula enable row level security;
alter table public.curriculum_skills enable row level security;
alter table public.knowledge_sources enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.product_types enable row level security;
alter table public.document_templates enable row level security;
alter table public.service_requests enable row level security;
alter table public.ai_generations enable row level security;
alter table public.audit_events enable row level security;

create policy organizations_member_read on public.organizations for select to authenticated using(public.is_org_member(id));
create policy memberships_own_read on public.organization_members for select to authenticated using(user_id=auth.uid() or public.has_org_role(organization_id,array['owner','admin','manager']::public.app_role[]));
create policy schools_member_read on public.schools for select to authenticated using(public.is_org_member(organization_id));
create policy curricula_authenticated_read on public.curricula for select to authenticated using(is_active=true);
create policy skills_authenticated_read on public.curriculum_skills for select to authenticated using(true);
create policy knowledge_published_read on public.knowledge_sources for select to authenticated using(status='published');
create policy knowledge_chunks_published_read on public.knowledge_chunks for select to authenticated using(exists(select 1 from public.knowledge_sources s where s.id=source_id and s.status='published'));
create policy product_types_active_read on public.product_types for select to authenticated using(is_active=true);
create policy templates_member_read on public.document_templates for select to authenticated using(organization_id is null or public.is_org_member(organization_id));
create policy requests_own_read on public.service_requests for select to authenticated using(requester_id=auth.uid() or (organization_id is not null and public.has_org_role(organization_id,array['owner','admin','manager','reviewer','support']::public.app_role[])));
create policy requests_own_insert on public.service_requests for insert to authenticated with check(requester_id=auth.uid() and (organization_id is null or public.is_org_member(organization_id)));
create policy requests_own_update on public.service_requests for update to authenticated using(requester_id=auth.uid() and status in ('draft','submitted')) with check(requester_id=auth.uid());
create policy ai_generations_own_read on public.ai_generations for select to authenticated using(user_id=auth.uid());

-- Replace permissive document access with ownership or organizational membership.
drop policy if exists "authenticated read active documents" on public.documents;
create policy documents_authorized_read on public.documents for select to authenticated using(
  is_active=true and (owner_id=auth.uid() or (organization_id is not null and public.is_org_member(organization_id)))
);

-- Storage objects must use the owner UUID as the first path segment.
drop policy if exists "authenticated storage downloads" on storage.objects;
create policy storage_owner_read on storage.objects for select to authenticated using(
  bucket_id='documentos-docentes' and (storage.foldername(name))[1]=auth.uid()::text
);
create policy storage_owner_insert on storage.objects for insert to authenticated with check(
  bucket_id='documentos-docentes' and (storage.foldername(name))[1]=auth.uid()::text
);

insert into public.product_types(code,name,description) values
('plano-aula','Plano de Aula','Planejamento estruturado por objetivos, habilidades, metodologia e avaliação.'),
('sequencia-didatica','Sequência Didática','Conjunto articulado de aulas com progressão pedagógica.'),
('avaliacao','Avaliação','Instrumento avaliativo com gabarito e critérios.'),
('rubrica','Rubrica','Matriz de critérios e níveis de desempenho.'),
('recuperacao-continua','Recuperação Contínua','Plano de intervenção e recomposição da aprendizagem.'),
('pei','PEI','Plano Educacional Individualizado.'),
('piaf','PIAF','Plano Individual de Aprimoramento e Formação.'),
('projeto-interdisciplinar','Projeto Interdisciplinar','Projeto integrando componentes e competências.'),
('guia-aprendizagem','Guia de Aprendizagem','Organização de objetivos, conteúdos, estratégias e evidências.'),
('relatorio-pedagogico','Relatório Pedagógico','Registro analítico de acompanhamento e encaminhamentos.')
on conflict(code) do update set name=excluded.name,description=excluded.description;

commit;