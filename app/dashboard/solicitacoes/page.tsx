import Link from "next/link";

const requests = [
  ["Plano de Aula — Frações", "Matemática • 7º ano", "Em produção", "24/07/2026"],
  ["Avaliação — Leitura e interpretação", "Língua Portuguesa • 9º ano", "Em revisão", "24/07/2026"],
  ["Rubrica — Sustentabilidade", "Ciências • 8º ano", "Concluído", "23/07/2026"],
  ["Sequência Didática — Brasil Colônia", "História • 8º ano", "Rascunho", "22/07/2026"],
];

export default function RequestsPage() {
  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">PRODUÇÃO PEDAGÓGICA</p><h2>Solicitações</h2><p className="muted">Acompanhe cada etapa da produção dos seus documentos.</p></div>
        <Link className="button" href="/dashboard/solicitacoes/nova">Nova solicitação</Link>
      </div>
      <div className="card table-card">
        <div className="table-row table-head"><span>Documento</span><span>Status</span><span>Atualização</span></div>
        {requests.map(([title, detail, status, date]) => (
          <div className="table-row" key={title}>
            <div><strong>{title}</strong><small>{detail}</small></div>
            <span className={`status ${status === "Concluído" ? "done" : status === "Em revisão" ? "review" : status === "Rascunho" ? "draft" : "progress"}`}>{status}</span>
            <span>{date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
