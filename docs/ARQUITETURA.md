# Arquitetura da Central Docente

## Objetivo

Construir uma plataforma SaaS educacional segura, modular e escalável para reduzir a carga burocrática de professores e equipes gestoras.

## Princípios

1. Regras pedagógicas não ficam acopladas ao modelo de IA.
2. Toda informação sensível é protegida por RLS no Supabase.
3. Conteúdo normativo e pedagógico possui origem, vigência e versão.
4. Gerações por IA são rastreáveis, revisáveis e auditáveis.
5. O sistema nasce preparado para múltiplas organizações, escolas e redes.

## Camadas

### Curriculum Engine

Responsável por currículos, componentes, etapas, anos, habilidades, competências, objetos de conhecimento, legislações e documentos normativos.

### Pedagogical Engine

Responsável por regras de composição dos produtos, validações, rubricas, estruturas obrigatórias, sequenciamento didático e critérios de qualidade.

### AI Engine

Responsável apenas por gerar, revisar e transformar conteúdo usando contexto previamente validado pelas demais camadas.

### Application Layer

Responsável por autenticação, autorização, solicitações, documentos, assinaturas, notificações, suporte e administração.

## Domínios principais

- Identidade e acesso
- Organizações e escolas
- Professores e estudantes
- Currículos e legislação
- Catálogo de produtos
- Templates documentais
- Solicitações e produção
- Geração por IA
- Biblioteca e downloads
- Assinaturas e limites
- Auditoria e conformidade
- Atendimento e suporte

## Segurança

- RLS obrigatória em todas as tabelas com dados de usuário.
- Papéis globais e papéis por organização.
- Buckets privados e acesso por vínculo explícito.
- Chaves secretas somente no servidor.
- Logs sem conteúdo pessoal sensível.
- Trilha de auditoria para operações administrativas.

## Estratégia de conhecimento

O Google Drive permanece como repositório editorial e institucional. O banco armazena registros estruturados, metadados, versões e referências de origem. Nenhum documento confidencial deve ser copiado automaticamente para o código-fonte.

Cada item da base de conhecimento deve possuir:

- título;
- tipo;
- jurisdição;
- etapa/modalidade;
- origem oficial;
- data de publicação;
- início e fim de vigência;
- versão;
- status de revisão;
- hash ou identificador da fonte;
- texto segmentado para recuperação contextual.

## Ambientes

- Desenvolvimento
- Homologação
- Produção

Cada ambiente deve possuir projeto Supabase e variáveis próprias. Alterações de banco são aplicadas exclusivamente por migrations versionadas.