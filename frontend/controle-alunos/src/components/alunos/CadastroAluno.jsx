import { useState } from "react";
import { cadastrarAluno } from "../../services/alunosService";

export default function CadastroAluno() {
  const [aluno, setAluno] = useState({
    nome: "",
    nascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    cpf: "",
    rg: "",
    status: "ativo"
  });
  const [foto, setFoto] = useState(null);

  const handleChange = (e) => {
    setAluno({ ...aluno, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cadastrarAluno(aluno, foto);
    alert("Aluno cadastrado com sucesso!");
    setAluno({
      nome: "",
      nascimento: "",
      endereco: "",
      telefone: "",
      email: "",
      cpf: "",
      rg: "",
      status: "ativo"
    });
    setFoto(null);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Cadastro de Aluno</h2>
      <input name="nome" placeholder="Nome" value={aluno.nome} onChange={handleChange} required />
      <input type="date" name="nascimento" value={aluno.nascimento} onChange={handleChange} />
      <input name="endereco" placeholder="Endereço" value={aluno.endereco} onChange={handleChange} />
      <input name="telefone" placeholder="Telefone" value={aluno.telefone} onChange={handleChange} />
      <input name="email" placeholder="Email" value={aluno.email} onChange={handleChange} />
      <input name="cpf" placeholder="CPF" value={aluno.cpf} onChange={handleChange} />
      <input name="rg" placeholder="RG" value={aluno.rg} onChange={handleChange} />
      <select name="status" value={aluno.status} onChange={handleChange}>
        <option>ativo</option>
        <option>trancado</option>
        <option>formado</option>
      </select>
      <input type="file" onChange={(e) => setFoto(e.target.files[0])} />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
