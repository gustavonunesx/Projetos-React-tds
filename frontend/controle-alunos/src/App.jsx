import React, { useState } from "react";
import CadastroAluno from "./components/alunos/CadastroAluno";
import ListaAlunos from "./components/alunos/ListaAlunos";
import CadastroTurma from "./components/turmas/CadastroTurma";
import ListaTurmas from "./components/turmas/ListaTurmas";
import RegistroPresenca from "./components/frequencia/RegistroPresenca";
import LancamentoNotas from "./components/notas/LancamentoNotas";
import Dashboard from "./components/relatorios/Dashboard";
import "./styles/style.css";

export default function App() {
  const [aba, setAba] = useState("alunos");

  return (
    <div className="container">
      <header>
        <h1>Controle de Alunos</h1>
        <nav>
          <button onClick={() => setAba("alunos")}>Alunos</button>
          <button onClick={() => setAba("turmas")}>Turmas</button>
          <button onClick={() => setAba("frequencia")}>Frequência</button>
          <button onClick={() => setAba("notas")}>Notas</button>
          <button onClick={() => setAba("dashboard")}>Dashboard</button>
        </nav>
      </header>

      {aba === "alunos" && (
        <div className="grid">
          <div className="card">
            <CadastroAluno />
          </div>
          <div className="card">
            <ListaAlunos />
          </div>
        </div>
      )}

      {aba === "turmas" && (
        <div className="grid">
          <div className="card">
            <CadastroTurma />
          </div>
          <div className="card">
            <ListaTurmas />
          </div>
        </div>
      )}

      {aba === "frequencia" && (
        <div className="card">
          <RegistroPresenca />
        </div>
      )}

      {aba === "notas" && (
        <div className="card">
          <LancamentoNotas />
        </div>
      )}

      {aba === "dashboard" && (
        <div className="card">
          <Dashboard />
        </div>
      )}
    </div>
  );
}
