import React, { useState } from "react";

const moodColors = {
  'Feliz': '#10b981',
  'Animado': '#f59e0b',
  'Tranquilo': '#3b82f6',
  'Neutro': '#6b7280',
  'Cansado': '#8b5cf6',
  'Triste': '#6366f1',
  'Estressado': '#ef4444',
  'Ansioso': '#f97316'
};

const moodEmojis = {
  'Feliz': '😊',
  'Animado': '🎉',
  'Tranquilo': '😌',
  'Neutro': '😐',
  'Cansado': '😴',
  'Triste': '😢',
  'Estressado': '😫',
  'Ansioso': '😰'
};

export default function MoodList({ moods, saveMoods }) {
  const [filter, setFilter] = useState('all');

  const removeMood = (id) => {
    if (window.confirm('Tem certeza que deseja remover este registro?')) {
      const filtered = moods.filter((m) => m.id !== id);
      saveMoods(filtered);
    }
  };

  const filteredMoods = filter === 'all' 
    ? moods 
    : moods.filter(mood => mood.mood === filter);

  const sortedMoods = [...filteredMoods].sort((a, b) => b.id - a.id);

  return (
    <div className="mood-list-container">
      <div className="list-header">
        <h3>Seu Histórico de Humores</h3>
        <p>{moods.length} registro{moods.length !== 1 ? 's' : ''} no total</p>
      </div>

      {moods.length > 0 && (
        <div className="filter-controls">
          <label>Filtrar por humor:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos os humores</option>
            {Object.keys(moodColors).map(mood => (
              <option key={mood} value={mood}>
                {moodEmojis[mood]} {mood}
              </option>
            ))}
          </select>
        </div>
      )}

      {sortedMoods.length === 0 ? (
        <div className="empty-state">
          <div className="empty-emoji">📝</div>
          <h4>Nenhum registro encontrado</h4>
          <p>
            {filter === 'all' 
              ? 'Comece registrando seu primeiro humor!'
              : `Nenhum registro com o humor "${filter}"`
            }
          </p>
        </div>
      ) : (
        <div className="mood-cards">
          {sortedMoods.map((mood) => (
            <div key={mood.id} className="mood-card">
              <div 
                className="mood-indicator"
                style={{ backgroundColor: moodColors[mood.mood] }}
              ></div>
              
              <div className="mood-content">
                <div className="mood-header">
                  <span className="mood-emoji">{moodEmojis[mood.mood]}</span>
                  <span className="mood-type">{mood.mood}</span>
                  <span className="mood-date">{mood.date}</span>
                </div>
                
                {mood.description && (
                  <p className="mood-description">{mood.description}</p>
                )}
                
                <button 
                  onClick={() => removeMood(mood.id)}
                  className="remove-button"
                >
                  🗑️ Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}