import { useState } from "react";

export default function StudentList({ students, onRemove, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", n1: "", n2: "", n3: "" });

  const startEdit = (student) => {
    setEditingId(student.id);
    setForm(student);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(editingId, {
      ...form,
      id: editingId,
      n1: parseFloat(form.n1),
      n2: parseFloat(form.n2),
      n3: parseFloat(form.n3),
    });
    setEditingId(null);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-3">📋 Lista de Alunos</h2>
      {students.length === 0 && <p>Nenhum aluno cadastrado.</p>}
      {students.map((s) => {
        const media = ((s.n1 + s.n2 + s.n3) / 3).toFixed(1);
        const situacao = media >= 7 ? "Aprovado ✅" : "Reprovado ❌";

        return (
          <div
            key={s.id}
            className="border-b py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            {editingId === s.id ? (
              <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-2 rounded"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={form.n1}
                    onChange={(e) => setForm({ ...form, n1: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="number"
                    value={form.n2}
                    onChange={(e) => setForm({ ...form, n2: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="number"
                    value={form.n3}
                    onChange={(e) => setForm({ ...form, n3: e.target.value })}
                    className="border p-2 rounded w-full"
                  />
                </div>
                <button className="bg-green-500 text-white py-1 rounded hover:bg-green-600">
                  Salvar
                </button>
              </form>
            ) : (
              <div className="flex-1">
                <p className="font-semibold">{s.name}</p>
                <p>Notas: {s.n1}, {s.n2}, {s.n3}</p>
                <p>Média: {media} - <span className="font-bold">{situacao}</span></p>
              </div>
            )}

            {editingId !== s.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(s)}
                  className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => onRemove(s.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}