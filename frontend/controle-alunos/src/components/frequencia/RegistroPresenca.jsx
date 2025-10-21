import React, { useEffect, useState } from "react";
import { listarAlunos } from "../../services/alunosService";
import { registrarPresenca } from "../../services/frequenciaService";
import { listarTurmas } from "../../services/turmasService";

export default function RegistroPresenca() {
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [turmaId, setTurmaId] = useState("");

  useEffect(() => {
    listarAlunos().then(setAlunos);
    listarTurmas().then(setTurmas);
  }, []);

  const marcarPresenca = async (alunoId, presente) => {
    if (!turmaId) return alert("Selecione a turma antes");
    await registrarPresenca(
      alunoId,
      turmaId,
      new Date().toISOString(),
      presente
    );
    alert("Presença registrada");
  };

  return (
    <div>
      <h2>Registro de Presença</h2>
      <select value={turmaId} onChange={(e) => setTurmaId(e.target.value)}>
        <option value="">Selecione a turma</option>
        {turmas.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nome}
          </option>
        ))}
      </select>

      <ul className="lista">
        {alunos.map((a) => (
          <li key={a.id} className="lista-item">
            <div>
              <strong>{a.nome}</strong>
              <div className="meta">{a.email}</div>
            </div>
            <div className="acoes">
              <button onClick={() => marcarPresenca(a.id, true)}>
                Presente
              </button>
              <button onClick={() => marcarPresenca(a.id, false)}>
                Faltou
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
