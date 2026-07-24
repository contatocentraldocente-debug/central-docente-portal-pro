import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  ["Visão geral", "/dashboard"],
  ["Nova solicitação", "/dashboard/solicitacoes/nova"],
  ["Solicitações", "/dashboard/solicitacoes"],
  ["Biblioteca", "/dashboard/biblioteca"],
  ["Produtos", "/dashboard/produtos"],
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="side">
        <Link className="side-brand" href="/dashboard">Central Docente</Link>
        <p className="side-caption">Inteligência para planejar.<br />Tempo para ensinar.</p>
        <nav>
          {navigation.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>
        <div className="side-footer">
          <span>Plano Inicial</span>
          <strong>Maria Fabiana</strong>
        </div>
      </aside>
      <main className="main">
        <header className="portal-header">
          <div>
            <p className="eyebrow">PORTAL DO PROFESSOR</p>
            <h1 className="portal-title">Central Docente</h1>
          </div>
          <Link className="button secondary" href="/">Sair</Link>
        </header>
        {children}
      </main>
    </div>
  );
}
