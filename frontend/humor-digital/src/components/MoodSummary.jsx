import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function MoodSummary({ moods }) {
  const moodCounts = moods.reduce((acc, m) => {
    acc[m.mood] = (acc[m.mood] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(moodCounts),
    datasets: [{
      label: 'Frequência de Humores',
      data: Object.values(moodCounts),
      backgroundColor: ['yellow', 'blue', 'red', 'orange', 'gray']
    }]
  };

  return (
    <div className="mood-summary">
      <h2>Resumo</h2>
      <Bar data={data} />
    </div>
  );
}
