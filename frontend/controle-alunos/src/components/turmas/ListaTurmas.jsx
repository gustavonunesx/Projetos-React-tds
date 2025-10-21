import { useEffect, useState } from "react";
import { listarTurmas, excluirTurma } from "../../services/turmasService";
import { listarAlunos } from "../../services/alunosService";

export default function ListaTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const listaTurmas = await listarTurmas();
    const listaAlunos = await listarAlunos();
    setTurmas(listaTurmas);
    setAlunos(listaAlunos);
  };

  const deletar = async (id) => {
    if (confirm("Deseja realmente excluir esta turma?")) {
      await excluirTurma(id);
      carregar();
    }
  };

  const nomeDosAlunos = (ids) => {
    return ids
      .map((id) => alunos.find((a) => a.id === id)?.nome || "—")
      .join(", ");
  };

  return (
    <div>
      <h2>Lista de Turmas</h2>
      <ul className="lista">
        {turmas.map((t) => (
          <li key={t.id} className="lista-item">
            <div>
              <strong>{t.nome}</strong> ({t.ano}) - {t.turno}
              <p><small>Alunos: {nomeDosAlunos(t.alunos || [])}</small></p>
            </div>
            <div>
              <button onClick={() => deletar(t.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
