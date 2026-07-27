import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const ferramentas = [
  ["Planejamento", "Organize aulas, semanas e bimestres."],
  ["Avaliações", "Crie questões, critérios e gabaritos."],
  ["Documentos", "Produza materiais pedagógicos essenciais."],
  ["Recuperação", "Planeje intervenções e acompanhe avanços."],
  ["Educação inclusiva", "Conheça os recursos do seu plano."],
  ["Maria", "Converse e encontre caminhos para sua rotina."],
];

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const name = String(user?.user_metadata?.full_name || "Professor(a)").split(
    " ",
  )[0];
  const levels = Array.isArray(user?.user_metadata?.school_levels)
    ? user.user_metadata.school_levels.join(" · ")
    : "Complete seu perfil";
  return (
    <>
      <section className="welcome-card">
        <div>
          <p className="eyebrow">BEM-VINDO(A) À CENTRAL DOCENTE</p>
          <h2>Olá, {name}! Vamos ganhar tempo para ensinar.</h2>
          <p>
            Seu espaço de trabalho pedagógico está pronto. Comece pelo que sua
            rotina precisa hoje.
          </p>
          <div className="welcome-actions">
            <Link className="button" href="/dashboard/solicitacoes/nova">
              Criar minha primeira produção
            </Link>
            <Link className="text-button" href="/perfil">
              Ver meu perfil
            </Link>
          </div>
        </div>
        <aside>
          <b>Plano Gratuito</b>
          <strong>100 créditos disponíveis hoje</strong>
          <span>Volte diariamente para resgatar créditos.</span>
          <Link href="/dashboard/produtos">Conhecer planos e créditos →</Link>
        </aside>
      </section>
      <section className="context-strip">
        <span>
          <b>Seu contexto</b>
          {levels}
        </span>
        <span>
          <b>Comunidade Central Docente</b>Receba novidades e atualizações no
          WhatsApp.
        </span>
        <Link href="/perfil">Configurar convite →</Link>
      </section>
      <section className="section-heading portal-section">
        <div>
          <p className="eyebrow">COMECE POR AQUI</p>
          <h2>O que deseja produzir?</h2>
          <p className="muted">
            Ferramentas apresentadas conforme seu perfil e o seu plano.
          </p>
        </div>
        <Link className="text-button" href="/dashboard/produtos">
          Ver todos os recursos →
        </Link>
      </section>
      <div className="tool-grid">
        {ferramentas.map(([title, text], index) => (
          <Link
            key={title}
            className="tool-card"
            href={
              title === "Maria"
                ? "/dashboard/produtos"
                : "/dashboard/solicitacoes/nova"
            }
          >
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <b>{title === "Maria" ? "Abrir Maria" : "Criar agora"} →</b>
          </Link>
        ))}
      </div>
      <section className="onboarding-checklist">
        <div>
          <p className="eyebrow">PRIMEIROS PASSOS</p>
          <h2>Uma rotina mais simples começa agora.</h2>
          <p>
            Complete seu contexto, crie um material e conheça os recursos
            liberados para você.
          </p>
        </div>
        <ol>
          <li>Perfil docente informado</li>
          <li>Conheça seus créditos</li>
          <li>Crie sua primeira produção</li>
          <li>Entre na Comunidade Central Docente</li>
        </ol>
      </section>
    </>
  );
}
