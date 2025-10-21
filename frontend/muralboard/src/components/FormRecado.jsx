import { useState } from "react";
import { criarRecado } from "../services/firestoreService";

export default function FormRecado() {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [categoria, setCategoria] = useState("Geral");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !mensagem) return;
    criarRecado(titulo, mensagem, categoria);
    setTitulo("");
    setMensagem("");
  };

  return (
    <form className="form-recado" onSubmit={handleSubmit}>
      <h2>📌 Novo Recado</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <textarea
        placeholder="Digite sua mensagem..."
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        required
      ></textarea>
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option>Geral</option>
        <option>Agradecimento</option>
        <option>Aviso</option>
        <option>Sugestão</option>
      </select>
      <button type="submit">Publicar</button>
    </form>
  );
}
