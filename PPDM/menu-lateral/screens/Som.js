import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#f7fafc",
      padding: "1rem",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
    card: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "1rem",
      boxShadow:
        "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      textAlign: "center",
      width: "100%",
      maxWidth: "28rem",
    },
    title: {
      fontSize: "1.875rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#718096",
      marginBottom: "2rem",
    },
    progressContainer: {
      width: "100%",
      backgroundColor: "#e2e8f0",
      borderRadius: "9999px",
      height: "0.5rem",
      marginBottom: "0.5rem",
    },
    progressBar: {
      backgroundColor: "#4299e1",
      height: "100%",
      borderRadius: "9999px",
      transition: "width 0.2s linear",
    },
    timeDisplay: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "0.875rem",
      color: "#718096",
      marginBottom: "1.5rem",
    },
    controls: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
    },
    button: {
      width: "4rem",
      height: "4rem",
      borderRadius: "50%",
      border: "none",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow:
        "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      transition: "all 0.3s ease-in-out",
    },
    playButton: {
      backgroundColor: "#48bb78",
    },
    pauseButton: {
      backgroundColor: "#f6ad55",
    },
    stopButton: {
      backgroundColor: "#f56565",
    },
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audioUrl =
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
    }

    const audio = audioRef.current;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const playSound = () => {
    audioRef.current.play().catch((error) => {
      console.error("Erro ao tentar tocar o áudio:", error);
    });
  };

  const pauseSound = () => {
    audioRef.current.pause();
  };

  const stopSound = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const PlayIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );

  const PauseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  );

  const StopIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18"></rect>
    </svg>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Reprodutor de Áudio</h1>
        <p style={styles.subtitle}>Controle a sua música</p>

        <div style={styles.progressContainer}>
          <div
            style={{
              ...styles.progressBar,
              width: `${(progress / duration) * 100 || 0}%`,
            }}
          ></div>
        </div>

        <div style={styles.timeDisplay}>
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div style={styles.controls}>
          <button
            onClick={playSound}
            disabled={isPlaying}
            style={{
              ...styles.button,
              ...styles.playButton,
              opacity: isPlaying ? 0.6 : 1,
            }}
          >
            <PlayIcon />
          </button>

          <button
            onClick={pauseSound}
            disabled={!isPlaying}
            style={{
              ...styles.button,
              ...styles.pauseButton,
              opacity: !isPlaying ? 0.6 : 1,
            }}
          >
            <PauseIcon />
          </button>

          <button
            onClick={stopSound}
            style={{
              ...styles.button,
              ...styles.stopButton,
            }}
          >
            <StopIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
