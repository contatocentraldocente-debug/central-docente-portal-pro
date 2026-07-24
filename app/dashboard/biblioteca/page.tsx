const documents = [
  ["Plano de Aula — Frações", "Matemática", "7º ano", "v2"],
  ["Avaliação — Leitura e interpretação", "Língua Portuguesa", "9º ano", "v1"],
  ["Rubrica — Sustentabilidade", "Ciências", "8º ano", "v3"],
  ["Sequência Didática — Brasil Colônia", "História", "8º ano", "v1"],
];

export default function LibraryPage() {
  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">ACERVO PESSOAL</p><h2>Biblioteca</h2><p className="muted">Documentos organizados, versionados e prontos para uso.</p></div></div>
      <div className="filter-bar card"><input placeholder="Buscar documento" /><select defaultValue=""><option value="">Todas as disciplinas</option><option>Matemática</option><option>Língua Portuguesa</option><option>Ciências</option></select><select defaultValue=""><option value="">Todos os anos</option><option>7º ano</option><option>8º ano</option><option>9º ano</option></select></div>
      <div className="document-grid">
        {documents.map(([title, subject, year, version]) => (
          <article className="card document-card" key={title}>
            <div className="document-icon">DOC</div>
            <h3>{title}</h3>
            <p className="muted">{subject} • {year}</p>
            <div className="document-footer"><span>{version}</span><button className="text-button">Abrir documento</button></div>
          </article>
        ))}
      </div>
    </section>
  );
}
