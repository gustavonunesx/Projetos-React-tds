import React, { useEffect, useState } from "react";
import { listarAlunos } from "../../services/alunosService";
import { listarNotasPorAluno } from "../../services/notasService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Dashboard() {
  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState("");
  const [dadosNotas, setDadosNotas] = useState([]);

  useEffect(() => {
    listarAlunos().then(setAlunos);
  }, []);

  useEffect(() => {
    if (!alunoSelecionado) return;
    listarNotasPorAluno(alunoSelecionado).then((notas) => {
      const dados = notas.map((n) => ({
        name: n.disciplinaId,
        media: n.media,
      }));
      setDadosNotas(dados);
    });
  }, [alunoSelecionado]);

  return (
    <div>
      <h2>Dashboard</h2>
      <select
        value={alunoSelecionado}
        onChange={(e) => setAlunoSelecionado(e.target.value)}
      >
        <option value="">Selecione um aluno</option>
        {alunos.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nome}
          </option>
        ))}
      </select>

      {dadosNotas.length > 0 && (
        <BarChart width={600} height={300} data={dadosNotas}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="media" />
        </BarChart>
      )}
    </div>
  );
}
