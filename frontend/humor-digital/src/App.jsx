import React, { useState } from "react";
import MoodForm from "./components/MoodForm.jsx";
import MoodList from "./components/MoodList.jsx";
import MoodChart from "./components/MoodChart.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

export default function App() {
  const [moods, setMoods] = useLocalStorage("moods", []);
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-content">
          <h1 className="app-title">🌤️ Diário de Humores</h1>
          <p className="app-subtitle">Acompanhe seu bem-estar emocional</p>
        </div>
      </div>

      <div className="app-content">
        <div className="navigation-tabs">
          <button 
            className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            📝 Registrar
          </button>
          <button 
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📋 Histórico
          </button>
          <button 
            className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
            disabled={moods.length === 0}
          >
            📊 Análises
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'form' && (
            <MoodForm moods={moods} saveMoods={setMoods} />
          )}
          {activeTab === 'history' && (
            <MoodList moods={moods} saveMoods={setMoods} />
          )}
          {activeTab === 'analytics' && moods.length > 0 && (
            <MoodChart moods={moods} />
          )}
        </div>

        {moods.length > 0 && (
          <div className="stats-card">
            <div className="stat-item">
              <span className="stat-number">{moods.length}</span>
              <span className="stat-label">Registros</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {new Set(moods.map(m => m.mood)).size}
              </span>
              <span className="stat-label">Humor{new Set(moods.map(m => m.mood)).size !== 1 ? 'es' : ''}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {moods.filter(m => m.description.trim() !== '').length}
              </span>
              <span className="stat-label">Com descrição</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}