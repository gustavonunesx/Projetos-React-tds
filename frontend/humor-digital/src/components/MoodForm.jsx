import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const moodsOptions = [
  { label: 'Feliz', color: 'yellow' },
  { label: 'Triste', color: 'blue' },
  { label: 'Estressado', color: 'red' },
  { label: 'Animado', color: 'orange' },
  { label: 'Cansado', color: 'gray' }
];

export default function MoodForm({ addMood }) {
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState(moodsOptions[0].label);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMood = {
      id: uuidv4(),
      mood,
      description,
      date: new Date().toISOString()
    };
    addMood(newMood);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mood-form">
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        {moodsOptions.map((m) => (
          <option key={m.label} value={m.label}>{m.label}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Descrição opcional"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Registrar Humor</button>
    </form>
  );
}
