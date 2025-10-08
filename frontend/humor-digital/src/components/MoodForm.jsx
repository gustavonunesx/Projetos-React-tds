import React, { useState } from "react";

export default function MoodForm({ moods, saveMoods }) {
  const [mood, setMood] = useState("Feliz");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMood = {
      id: Date.now(),
      mood,
      description,
      date: new Date().toLocaleDateString(),
    };
    saveMoods([newMood, ...moods]);
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "20px",
      padding: "15px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
    }}>
      <label>
        Humor:
        <select value={mood} onChange={(e) => setMood(e.target.value)} style={{
          marginLeft: "10px",
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}>
          <option>Feliz</option>
          <option>Triste</option>
          <option>Estressado</option>
          <option>Animado</option>
          <option>Cansado</option>
        </select>
      </label>

      <label>
        Descrição:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Opcional"
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </label>

      <button type="submit" style={{
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#4ecdc4",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer"
      }}>
        Registrar Humor
      </button>
    </form>
  );
}
