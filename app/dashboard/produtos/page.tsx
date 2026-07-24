import Link from "next/link";

const products = [
  ["Plano de Aula", "Objetivos, habilidades, metodologia, recursos e avaliação."],
  ["Sequência Didática", "Aulas articuladas com progressão pedagógica e evidências."],
  ["Avaliação", "Questões, gabarito e critérios alinhados ao objetivo."],
  ["Rubrica", "Critérios objetivos e níveis de desempenho."],
  ["Recuperação Contínua", "Intervenção e recomposição da aprendizagem."],
  ["PEI", "Plano Educacional Individualizado estruturado."],
  ["PIAF", "Plano Individual de Aprimoramento e Formação."],
  ["Projeto Interdisciplinar", "Integração entre componentes e competências."],
  ["Guia de Aprendizagem", "Objetivos, conteúdos, estratégias e evidências."],
  ["Relatório Pedagógico", "Registro analítico de acompanhamento e encaminhamentos."],
];

export default function ProductsPage() {
  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">SOLUÇÕES DISPONÍVEIS</p><h2>Catálogo pedagógico</h2><p className="muted">Escolha o documento necessário e inicie uma solicitação guiada.</p></div></div>
      <div className="product-grid">
        {products.map(([name, description], index) => (
          <article className="card product-card" key={name}>
            <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{name}</h3>
            <p className="muted">{description}</p>
            <Link className="text-button" href="/dashboard/solicitacoes/nova">Solicitar agora →</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
