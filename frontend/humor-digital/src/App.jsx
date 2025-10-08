import React, { useState, useEffect } from "react";
import MoodForm from "./components/MoodForm.jsx";
import MoodList from "./components/MoodList.jsx";
import MoodChart from "./components/MoodChart.jsx";

export default function App() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const storedMoods = localStorage.getItem("moods");
    if (storedMoods) setMoods(JSON.parse(storedMoods));
  }, []);

  const saveMoods = (newMoods) => {
    setMoods(newMoods);
    localStorage.setItem("moods", JSON.stringify(newMoods));
  };

  return (
    <div style={{
      maxWidth: "700px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f4f8",
      borderRadius: "10px",
      boxShadow: "0px 0px 15px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Humor Diário</h1>
      <MoodForm moods={moods} saveMoods={saveMoods} />
      <MoodList moods={moods} saveMoods={saveMoods} />
      {moods.length > 0 && <MoodChart moods={moods} />}
    </div>
  );
}
