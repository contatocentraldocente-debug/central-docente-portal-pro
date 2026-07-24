import Link from "next/link";

const metrics = [
  ["Documentos", "12", "produzidos"],
  ["Solicitações", "3", "em andamento"],
  ["Tempo poupado", "18h", "neste mês"],
  ["Downloads", "27", "realizados"],
];

export default function DashboardPage() {
  return (
    <>
      <section className="welcome card accent-card">
        <div>
          <p className="eyebrow">BOM TRABALHO, PROFESSORA</p>
          <h2>Seu planejamento começa aqui.</h2>
          <p className="muted">Crie documentos pedagógicos estruturados e mantenha tudo organizado em um único lugar.</p>
        </div>
        <Link className="button" href="/dashboard/solicitacoes/nova">Criar documento</Link>
      </section>

      <section className="metric-grid">
        {metrics.map(([label, value, detail]) => (
          <article className="card metric" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="card">
          <div className="section-heading"><h2>Solicitações recentes</h2><Link href="/dashboard/solicitacoes">Ver todas</Link></div>
          <div className="list">
            <div className="list-row"><div><strong>Plano de Aula — Matemática</strong><span>7º ano • Frações</span></div><span className="status progress">Em produção</span></div>
            <div className="list-row"><div><strong>Avaliação — Língua Portuguesa</strong><span>9º ano • Leitura e interpretação</span></div><span className="status review">Em revisão</span></div>
            <div className="list-row"><div><strong>Rubrica — Projeto de Ciências</strong><span>8º ano • Sustentabilidade</span></div><span className="status done">Concluído</span></div>
          </div>
        </article>

        <article className="card">
          <div className="section-heading"><h2>Acesso rápido</h2></div>
          <div className="quick-actions">
            <Link href="/dashboard/solicitacoes/nova"><strong>Novo planejamento</strong><span>Inicie uma solicitação guiada</span></Link>
            <Link href="/dashboard/biblioteca"><strong>Minha biblioteca</strong><span>Acesse documentos e versões</span></Link>
            <Link href="/dashboard/produtos"><strong>Catálogo pedagógico</strong><span>Veja todas as soluções disponíveis</span></Link>
          </div>
        </article>
      </section>
    </>
  );
}
