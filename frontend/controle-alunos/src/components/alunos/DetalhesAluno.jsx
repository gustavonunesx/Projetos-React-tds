import React, { useState } from "react";
import { atualizarAluno } from "../../services/alunosService";

export default function DetalhesAluno({ aluno }) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ ...aluno });
  const [novaFoto, setNovaFoto] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const salvar = async () => {
    await atualizarAluno(aluno.id, form, novaFoto);
    setEditando(false);
    alert("Atualizado com sucesso");
  };

  return (
    <div>
      <h3>Detalhes: {aluno.nome}</h3>

      {aluno.fotoUrl && (
        <img
          src={aluno.fotoUrl}
          alt={aluno.nome}
          style={{ maxWidth: 120, borderRadius: 8 }}
        />
      )}

      {!editando ? (
        <div className="detalhes">
          <p>
            <strong>Nome:</strong> {aluno.nome}
          </p>
          <p>
            <strong>Email:</strong> {aluno.email}
          </p>
          <p>
            <strong>Telefone:</strong> {aluno.telefone}
          </p>
          <p>
            <strong>CPF:</strong> {aluno.cpf}
          </p>
          <p>
            <strong>RG:</strong> {aluno.rg}
          </p>
          <p>
            <strong>Status:</strong> {aluno.status}
          </p>
          <div className="acoes">
            <button onClick={() => setEditando(true)}>Editar</button>
          </div>
        </div>
      ) : (
        <div className="editar">
          <input name="nome" value={form.nome} onChange={handleChange} />
          <input name="email" value={form.email} onChange={handleChange} />
          <input
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="ativo">ativo</option>
            <option value="trancado">trancado</option>
            <option value="formado">formado</option>
          </select>
          <label>Nova foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNovaFoto(e.target.files[0])}
          />
          <div className="acoes">
            <button onClick={salvar}>Salvar</button>
            <button onClick={() => setEditando(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
