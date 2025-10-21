import { useEffect, useState } from "react";
import { listarAlunos, excluirAluno } from "../../services/alunosService";
import DetalhesAluno from "./DetalhesAluno";

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const lista = await listarAlunos();
    setAlunos(lista);
  };

  const deletar = async (id) => {
    if (confirm("Excluir este aluno?")) {
      await excluirAluno(id);
      carregar();
    }
  };

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <ul className="lista">
        {alunos.map((a) => (
          <li key={a.id} className="lista-item">
            <div>
              <strong>{a.nome}</strong> - {a.status}
            </div>
            <div>
              <button onClick={() => setSelecionado(a)}>Detalhes</button>
              <button onClick={() => deletar(a.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      {selecionado && (
        <div className="modal">
          <div className="modal-content">
            <DetalhesAluno aluno={selecionado} />
            <button onClick={() => setSelecionado(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
