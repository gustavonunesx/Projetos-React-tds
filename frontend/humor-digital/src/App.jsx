import React, { useState, useEffect } from 'react';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import MoodSummary from './components/MoodSummary';
import './App.css';

export default function App() {
  const [moods, setMoods] = useState([]);

  // Carregar dados do LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem('moods');
    if (stored) setMoods(JSON.parse(stored));
  }, []);

  // Salvar no LocalStorage sempre que moods mudarem
  useEffect(() => {
    localStorage.setItem('moods', JSON.stringify(moods));
  }, [moods]);

  const addMood = (mood) => setMoods([mood, ...moods]);
  const removeMood = (id) => setMoods(moods.filter(m => m.id !== id));
  const updateMood = (updated) =>
    setMoods(moods.map(m => (m.id === updated.id ? updated : m)));

  return (
    <div className="App">
      <h1>Diário de Humor</h1>
      <MoodForm addMood={addMood} />
      <MoodSummary moods={moods} />
      <MoodList moods={moods} removeMood={removeMood} updateMood={updateMood} />
    </div>
  );
}
