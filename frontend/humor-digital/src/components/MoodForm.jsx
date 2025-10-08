import React, { useState } from "react";

const moodOptions = [
  { value: "Feliz", emoji: "😊", color: "#10b981" },
  { value: "Animado", emoji: "🎉", color: "#f59e0b" },
  { value: "Tranquilo", emoji: "😌", color: "#3b82f6" },
  { value: "Neutro", emoji: "😐", color: "#6b7280" },
  { value: "Cansado", emoji: "😴", color: "#8b5cf6" },
  { value: "Triste", emoji: "😢", color: "#6366f1" },
  { value: "Estressado", emoji: "😫", color: "#ef4444" },
  { value: "Ansioso", emoji: "😰", color: "#f97316" }
];

export default function MoodForm({ moods, saveMoods }) {
  const [mood, setMood] = useState("Feliz");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood.trim()) return;

    const newMood = {
      id: Date.now(),
      mood,
      description: description.trim(),
      date: new Date().toLocaleDateString('pt-BR'),
      timestamp: new Date().toISOString()
    };
    
    saveMoods([newMood, ...moods]);
    setDescription("");
    
    // Feedback visual
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Registrado!';
    submitBtn.style.background = '#10b981';
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
    }, 2000);
  };

  const selectedMood = moodOptions.find(m => m.value === mood);

  return (
    <div className="mood-form-container">
      <form onSubmit={handleSubmit} className="mood-form">
        <div className="form-header">
          <h3>Como você está se sentindo hoje?</h3>
          <p>Registre seu humor atual e adicione uma descrição se quiser</p>
        </div>

        <div className="mood-selection">
          <label className="form-label">Selecione seu humor:</label>
          <div className="mood-grid">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`mood-option ${mood === option.value ? 'selected' : ''}`}
                onClick={() => setMood(option.value)}
                style={{
                  borderColor: mood === option.value ? option.color : 'transparent',
                  background: mood === option.value ? `${option.color}15` : '#f8fafc'
                }}
              >
                <span className="mood-emoji">{option.emoji}</span>
                <span className="mood-text">{option.value}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="description-field">
          <label className="form-label">Descrição (opcional):</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva brevemente o que está influenciando seu humor..."
            className="description-input"
            rows="3"
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          style={{
            background: selectedMood?.color ? `linear-gradient(135deg, ${selectedMood.color}, ${selectedMood.color}dd)` : ''
          }}
        >
          <span>💾 Registrar Humor</span>
        </button>
      </form>
    </div>
  );
}