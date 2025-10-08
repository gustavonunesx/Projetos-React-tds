import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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

export default function MoodChart({ moods }) {
  const counts = moods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {});

  const sortedMoods = Object.entries(counts)
    .sort(([,a], [,b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  const barData = {
    labels: Object.keys(sortedMoods),
    datasets: [
      {
        label: "Quantidade de Registros",
        data: Object.values(sortedMoods),
        backgroundColor: Object.keys(sortedMoods).map(mood => moodColors[mood]),
        borderRadius: 12,
        borderWidth: 0,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(sortedMoods),
    datasets: [
      {
        data: Object.values(sortedMoods),
        backgroundColor: Object.keys(sortedMoods).map(mood => moodColors[mood]),
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      title: {
        display: true,
        text: 'Distribuição de Humores',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      }
    },
    cutout: '60%',
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h3>📊 Análises dos Seus Humores</h3>
        <p>Visualize a distribuição e frequência dos seus humores registrados</p>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h4>Frequência por Humor</h4>
          <div className="chart-container">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h4>Distribuição Percentual</h4>
          <div className="chart-container">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      <div className="mood-stats">
        <h4>Estatísticas Detalhadas</h4>
        <div className="stats-grid">
          {Object.entries(sortedMoods).map(([mood, count]) => {
            const percentage = ((count / moods.length) * 100).toFixed(1);
            return (
              <div key={mood} className="mood-stat-item">
                <div className="mood-stat-header">
                  <span 
                    className="mood-color-dot"
                    style={{ backgroundColor: moodColors[mood] }}
                  ></span>
                  <span className="mood-name">{mood}</span>
                </div>
                <div className="mood-stat-numbers">
                  <span className="mood-count">{count} vez{count !== 1 ? 'es' : ''}</span>
                  <span className="mood-percentage">{percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: moodColors[mood]
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}