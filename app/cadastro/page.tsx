import { signUp } from "@/app/actions/auth";

const etapas = [
  "Educação Infantil",
  "0 a 1 ano",
  "2 a 3 anos",
  "4 a 5 anos",
  "1º ano",
  "2º ano",
  "3º ano",
  "4º ano",
  "5º ano",
  "6º ano",
  "7º ano",
  "8º ano",
  "9º ano",
  "[EM] 1ª série",
  "[EM] 2ª série",
  "[EM] 3ª série",
  "Universidade",
  "Ensino Técnico",
  "Outras",
];
const componentes = [
  "Língua Portuguesa",
  "Matemática",
  "Ciências",
  "História",
  "Geografia",
  "Arte",
  "Educação Física",
  "Língua Inglesa",
  "Componentes do Itinerário Formativo",
  "Outro componente",
];

export default async function Cadastro({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const p = await searchParams;
  return (
    <main className="onboarding-page">
      <section className="onboarding-copy">
        <p className="eyebrow">PORTAL DOCENTE</p>
        <h1>Seu trabalho pedagógico começa com contexto.</h1>
        <p>
          Feita por professores da Rede Estadual de São Paulo, para apoiar a
          rotina de quem ensina.
        </p>
        <div className="onboarding-steps">
          <span>1. Crie sua conta</span>
          <span>2. Conte sobre sua atuação</span>
          <span>3. Entre no seu Portal</span>
        </div>
      </section>
      <section className="card form onboarding-form">
        <p className="eyebrow">CRIAR CONTA</p>
        <h2>Vamos conhecer sua rotina.</h2>
        <p className="muted">
          Essas informações ajudam a organizar uma experiência mais útil para
          você.
        </p>
        {p.erro && <div className="notice">{p.erro}</div>}
        <form action={signUp}>
          <div className="field">
            <label htmlFor="fullName">Nome completo</label>
            <input id="fullName" name="fullName" autoComplete="name" required />
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                id="whatsapp"
                name="whatsapp"
                inputMode="tel"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="country">País</label>
              <input
                id="country"
                name="country"
                defaultValue="Brasil"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="state">Estado</label>
              <input
                id="state"
                name="state"
                placeholder="Ex.: São Paulo"
                required
              />
            </div>
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <input id="city" name="city" required />
            </div>
            <div className="field">
              <label htmlFor="school">Em qual escola você dá aula?</label>
              <input
                id="school"
                name="school"
                placeholder="Digite o nome da escola"
              />
            </div>
          </div>
          <p className="field-hint">
            A seleção de escola por nome e endereço será ativada com a base
            oficial de unidades escolares. Enquanto isso, informe o nome para
            completar seu perfil.
          </p>
          <div className="field">
            <label htmlFor="schoolLevels">
              Quais anos ou etapas você atende?
            </label>
            <select
              id="schoolLevels"
              name="schoolLevels"
              multiple
              required
              size={6}
            >
              {etapas.map((etapa) => (
                <option key={etapa}>{etapa}</option>
              ))}
            </select>
            <span className="field-hint">
              Use Ctrl ou Cmd para selecionar mais de uma opção.
            </span>
          </div>
          <div className="field">
            <label htmlFor="subjects">Quais componentes você leciona?</label>
            <select id="subjects" name="subjects" multiple required size={6}>
              {componentes.map((componente) => (
                <option key={componente}>{componente}</option>
              ))}
            </select>
            <span className="field-hint">
              Base comum e itinerário formativo podem ser selecionados juntos.
            </span>
          </div>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                minLength={8}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="confirmation">Confirmar senha</label>
              <input
                id="confirmation"
                name="confirmation"
                type="password"
                minLength={8}
                autoComplete="new-password"
                required
              />
            </div>
          </div>
          <label className="check">
            <input name="whatsappConsent" type="checkbox" />
            <span>
              Quero receber o convite da Comunidade Central Docente e
              comunicações no WhatsApp. Posso cancelar a qualquer momento.
            </span>
          </label>
          <label className="check">
            <input name="privacyConsent" type="checkbox" required />
            <span>
              Li e concordo com a Política de Privacidade e os Termos de Uso.
            </span>
          </label>
          <button className="button">Criar minha conta</button>
        </form>
        <p className="form-links">
          <a href="/login">Já tenho conta</a>
          <a href="/recuperar-senha">Esqueci minha senha</a>
        </p>
      </section>
    </main>
  );
}
