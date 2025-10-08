import React from "react";

export default function MoodList({ moods, saveMoods }) {
  const removeMood = (id) => {
    const filtered = moods.filter((m) => m.id !== id);
    saveMoods(filtered);
  };

  return (
    <div>
      <h2 style={{ color: "#333" }}>Histórico de Humores</h2>
      {moods.length === 0 && <p>Nenhum registro ainda.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {moods.map((m) => (
          <li
            key={m.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: "#fff",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.1)"
            }}
          >
            <span>
              <strong>{m.mood}</strong> ({m.date}) {m.description && `- ${m.description}`}
            </span>
            <button
              onClick={() => removeMood(m.id)}
              style={{
                padding: "5px 10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#ff6b6b",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
