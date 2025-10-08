import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MoodChart({ moods }) {
  const counts = moods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Frequência de humores",
        data: Object.values(counts),
        backgroundColor: [
          "#f6d365",
          "#ff6b6b",
          "#4ecdc4",
          "#556270",
          "#c7f464",
          "#ffb347",
        ],
      },
    ],
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
    </div>
  );
}
