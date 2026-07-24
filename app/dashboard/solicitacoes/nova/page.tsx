export default function NewRequestPage() {
  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">SOLICITAÇÃO GUIADA</p><h2>Novo documento</h2><p className="muted">Preencha as informações essenciais para iniciar a produção.</p></div>
      </div>
      <form className="card request-form">
        <div className="form-grid">
          <label className="field"><span>Tipo de documento</span><select defaultValue="plano-aula"><option value="plano-aula">Plano de Aula</option><option>Avaliação</option><option>Sequência Didática</option><option>Rubrica</option><option>PEI</option><option>PIAF</option></select></label>
          <label className="field"><span>Disciplina</span><input placeholder="Ex.: Matemática" /></label>
          <label className="field"><span>Ano ou série</span><input placeholder="Ex.: 7º ano" /></label>
          <label className="field"><span>Tema principal</span><input placeholder="Ex.: Frações equivalentes" /></label>
          <label className="field full"><span>Objetivo de aprendizagem</span><textarea rows={4} placeholder="Descreva o que os estudantes devem aprender." /></label>
          <label className="field full"><span>Observações e contexto da turma</span><textarea rows={4} placeholder="Inclua perfil da turma, adaptações, recursos disponíveis e prazo." /></label>
        </div>
        <div className="form-actions"><button className="button secondary" type="button">Salvar rascunho</button><button className="button" type="submit">Enviar solicitação</button></div>
      </form>
    </section>
  );
}
