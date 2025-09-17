import { useState } from "react";

export default function StudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [n3, setN3] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !n1 || !n2 || !n3) return alert("Preencha todos os campos!");

    onAdd({
      name,
      n1: parseFloat(n1),
      n2: parseFloat(n2),
      n3: parseFloat(n3),
    });

    setName("");
    setN1("");
    setN2("");
    setN3("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Nome do aluno"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="N1"
          value={n1}
          onChange={(e) => setN1(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="N2"
          value={n2}
          onChange={(e) => setN2(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="N3"
          value={n3}
          onChange={(e) => setN3(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Adicionar Aluno
      </button>
    </form>
  );
}