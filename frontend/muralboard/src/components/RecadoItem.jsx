import { useState } from "react";
import { editarRecado, excluirRecado } from "../services/firestoreService";

export default function RecadoItem({ recado }) {
  const [editando, setEditando] = useState(false);
  const [novaMensagem, setNovaMensagem] = useState(recado.mensagem);

  const salvarEdicao = () => {
    editarRecado(recado.id, { mensagem: novaMensagem });
    setEditando(false);
  };

  return (
    <div className="recado-item">
      <h3>{recado.titulo}</h3>
      <span className="categoria">{recado.categoria}</span>
      {editando ? (
        <>
          <textarea
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
          ></textarea>
          <button onClick={salvarEdicao}>Salvar</button>
        </>
      ) : (
        <p>{recado.mensagem}</p>
      )}
      <div className="acoes">
        <button onClick={() => setEditando(!editando)}>
          {editando ? "Cancelar" : "Editar"}
        </button>
        <button onClick={() => excluirRecado(recado.id)}>Excluir</button>
      </div>
    </div>
  );
}
