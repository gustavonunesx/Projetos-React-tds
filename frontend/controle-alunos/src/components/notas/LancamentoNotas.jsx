import React, { useEffect, useState } from "react";
import { listarAlunos } from "../../services/alunosService";
import { listarDisciplinas } from "../../services/disciplinasService";
import { lancarNota } from "../../services/notasService";

export default function LancamentoNotas() {
  const [alunos, setAlunos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [form, setForm] = useState({
    alunoId: "",
    disciplinaId: "",
    bimestre: "1",
    nota1: "",
    nota2: "",
  });

  useEffect(() => {
    listarAlunos().then(setAlunos);
    listarDisciplinas().then(setDisciplinas);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.alunoId || !form.disciplinaId)
      return alert("Selecione aluno e disciplina");
    await lancarNota(
      form.alunoId,
      form.disciplinaId,
      form.bimestre,
      form.nota1,
      form.nota2
    );
    alert("Nota lançada");
    setForm({
      alunoId: "",
      disciplinaId: "",
      bimestre: "1",
      nota1: "",
      nota2: "",
    });
  };

  return (
    <div>
      <h2>Lançamento de Notas</h2>
      <form onSubmit={submit} className="form">
        <select
          name="alunoId"
          value={form.alunoId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o aluno</option>
          {alunos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome}
            </option>
          ))}
        </select>

        <select
          name="disciplinaId"
          value={form.disciplinaId}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a disciplina</option>
          {disciplinas.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
        </select>

        <input name="bimestre" value={form.bimestre} onChange={handleChange} />
        <input
          name="nota1"
          placeholder="Nota 1"
          value={form.nota1}
          onChange={handleChange}
        />
        <input
          name="nota2"
          placeholder="Nota 2"
          value={form.nota2}
          onChange={handleChange}
        />
        <button type="submit">Lançar</button>
      </form>
    </div>
  );
}
