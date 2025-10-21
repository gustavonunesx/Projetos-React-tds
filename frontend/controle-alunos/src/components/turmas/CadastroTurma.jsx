import { useState, useEffect } from "react";
import { cadastrarTurma } from "../../services/turmasService";
import { listarAlunos } from "../../services/alunosService";

export default function CadastroTurma() {
  const [turma, setTurma] = useState({
    nome: "",
    ano: "",
    turno: "",
    alunos: []
  });
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    const lista = await listarAlunos();
    setAlunos(lista);
  };

  const handleChange = (e) => {
    setTurma({ ...turma, [e.target.name]: e.target.value });
  };

  const handleAlunoChange = (id) => {
    const selecionados = turma.alunos.includes(id)
      ? turma.alunos.filter((a) => a !== id)
      : [...turma.alunos, id];
    setTurma({ ...turma, alunos: selecionados });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cadastrarTurma(turma);
    alert("Turma cadastrada com sucesso!");
    setTurma({ nome: "", ano: "", turno: "", alunos: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Cadastro de Turma</h2>
      <input
        name="nome"
        placeholder="Nome da Turma"
        value={turma.nome}
        onChange={handleChange}
        required
      />
      <input
        name="ano"
        placeholder="Ano"
        value={turma.ano}
        onChange={handleChange}
      />
      <select name="turno" value={turma.turno} onChange={handleChange}>
        <option value="">Selecione o turno</option>
        <option value="manhã">Manhã</option>
        <option value="tarde">Tarde</option>
        <option value="noite">Noite</option>
      </select>

      <h3>Alunos</h3>
      <div className="checkbox-list">
        {alunos.map((a) => (
          <label key={a.id}>
            <input
              type="checkbox"
              checked={turma.alunos.includes(a.id)}
              onChange={() => handleAlunoChange(a.id)}
            />
            {a.nome}
          </label>
        ))}
      </div>

      <button type="submit">Cadastrar Turma</button>
    </form>
  );
}
