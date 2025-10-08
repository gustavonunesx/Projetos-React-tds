import React, { useState } from 'react';

export default function MoodList({ moods, removeMood, updateMood }) {
  const [editingId, setEditingId] = useState(null);
  const [editDescription, setEditDescription] = useState('');

  const startEditing = (mood) => {
    setEditingId(mood.id);
    setEditDescription(mood.description);
  };

  const saveEdit = (id) => {
    updateMood({ id, description: editDescription, mood: moods.find(m => m.id === id).mood, date: moods.find(m => m.id === id).date });
    setEditingId(null);
    setEditDescription('');
  };

  return (
    <div className="mood-list">
      <h2>Registros</h2>
      {moods.length === 0 && <p>Nenhum registro ainda</p>}
      <ul>
        {moods.map((m) => (
          <li key={m.id} style={{ borderLeft: `5px solid black`, padding: '5px' }}>
            <strong>{m.mood}</strong> ({new Date(m.date).toLocaleDateString()})
            {editingId === m.id ? (
              <>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={() => saveEdit(m.id)}>Salvar</button>
              </>
            ) : (
              <>
                <p>{m.description}</p>
                <button onClick={() => startEditing(m)}>Editar</button>
              </>
            )}
            <button onClick={() => removeMood(m.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
