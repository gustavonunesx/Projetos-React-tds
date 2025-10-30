import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  // Estilos CSS-in-JS para a web (baseado no StyleSheet nativo)
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
      fontSize: "1.875rem", // ~30px
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "0.5rem", // 8px
    },
    subtitle: {
      color: "#718096",
      marginBottom: "2rem", // 32px
      fontSize: "1rem", // 16px
    },
    progressContainer: {
      width: "100%",
      backgroundColor: "#e2e8f0",
      borderRadius: "9999px",
      height: "0.5rem", // 8px
      marginBottom: "0.5rem", // 8px
      overflow: 'hidden',
    },
    progressBar: {
      backgroundColor: "#4299e1",
      height: "100%",
      borderRadius: "9999px",
      transition: "width 0.1s linear", // Transição suave para a barra
    },
    timeDisplay: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "1.5rem", // 24px
    },
    timeText: {
      fontSize: "0.875rem", // 14px
      color: "#718096",
    },
    controls: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem", // 16px
    },
    button: {
      width: "4rem", // 64px
      height: "4rem", // 64px
      borderRadius: "50%", // 32px
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      boxShadow:
        "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
      transition: "all 0.2s ease-in-out",
    },
    iconSvg: {
      width: "24px",
      height: "24px",
      fill: "currentColor",
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

  // Ícones SVG para a web
  const PlayIcon = () => (
    <svg style={styles.iconSvg} viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
  );
  const PauseIcon = () => (
    <svg style={styles.iconSvg} viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
  );
  const StopIcon = () => (
    <svg style={styles.iconSvg} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"></rect></svg>
  );

  // Função para formatar o tempo
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Carregar o áudio (useEffect é executado uma vez)
  useEffect(() => {
    const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    
    // Usar 'new Audio()' que é a API do navegador web
    // Garantir que a instância só é criada uma vez
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
    }
    
    const audio = audioRef.current;

    // Função de callback para atualizações de status
    const onStatusUpdate = () => {
      setIsPlaying(!audio.paused);
      setDuration(audio.duration || 0);
      setProgress(audio.currentTime || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0; // Rebobina
    };

    // Adicionar listeners de evento
    audio.addEventListener('play', onStatusUpdate);
    audio.addEventListener('pause', onStatusUpdate);
    audio.addEventListener('timeupdate', onStatusUpdate);
    audio.addEventListener('loadedmetadata', onStatusUpdate);
    audio.addEventListener('ended', onEnded);
    
    // Tenta carregar os metadados
    if(audio.readyState === 0) {
      audio.load();
    }

    // Função de limpeza
    return () => {
      if (!audio) return;
      audio.removeEventListener('play', onStatusUpdate);
      audio.removeEventListener('pause', onStatusUpdate);
      audio.removeEventListener('timeupdate', onStatusUpdate);
      audio.removeEventListener('loadedmetadata', onStatusUpdate);
      audio.removeEventListener('ended', onEnded);
      
      // Pausa e limpa a referência ao desmontar
      audio.pause();
    };
  }, []); // O array vazio [] garante que isto só corre uma vez

  // --- Funções de Controle (Web Audio API) ---
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Erro ao tocar:", e));
    }
  };

  const pauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Rebobina
    }
  };

  // --- Renderização (HTML/JSX) ---
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Reprodutor de Áudio</h1>
        <p style={styles.subtitle}>Controle a sua música</p>

        {/* Barra de Progresso */}
        <div style={styles.progressContainer}>
          <div
            style={{
              ...styles.progressBar,
              width: `${(progress / duration) * 100 || 0}%`,
            }}
          />
        </div>

        {/* Tempos */}
        <div style={styles.timeDisplay}>
          <span style={styles.timeText}>{formatTime(progress)}</span>
          <span style={styles.timeText}>{formatTime(duration)}</span>
        </div>

        {/* Controles (botões HTML) */}
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
            style={{ ...styles.button, ...styles.stopButton }}
          >
            <StopIcon />
          </button>
        </div>
      </div>
    </div>
  );
}