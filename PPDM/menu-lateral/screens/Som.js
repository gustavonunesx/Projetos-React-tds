import React, { useState, useEffect, useRef } from "react";
// 1. Importar componentes do React Native
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
// 2. Importar a biblioteca de Áudio do Expo
import { Audio } from "expo-av";
// 3. (Opcional) Usar ícones nativos
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  // Mudar a referência para o objeto de Som do Expo
  const soundRef = useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  // Função para formatar o tempo (igual à sua)
  const formatTime = (timeInMillis) => {
    if (isNaN(timeInMillis) || timeInMillis === 0) return "0:00";
    const totalSeconds = timeInMillis / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Função para carregar o áudio
  const loadSound = async () => {
    try {
      const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      await soundRef.current.loadAsync({ uri: audioUrl });
      
      // Monitorar o status da reprodução
      soundRef.current.setOnPlaybackStatusUpdate(onStatusUpdate);
    } catch (error) {
      console.error("Erro ao carregar o som:", error);
    }
  };

  // Carregar o áudio (useEffect)
  useEffect(() => {
    // Configurar modo de áudio para tocar no alto-falante
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    
    loadSound();

    // Função de limpeza para descarregar o som
    return () => {
      soundRef.current.unloadAsync();
    };
  }, []);

  // Callback de atualização de status
  const onStatusUpdate = (status) => {
    if (!status.isLoaded) {
      if (status.error) {
        console.error(`Erro no player: ${status.error}`);
      }
      return;
    }
    
    setIsPlaying(status.isPlaying);
    setDuration(status.durationMillis || 0);
    setProgress(status.positionMillis || 0);

    // Se terminou, reseta o estado
    if (status.didJustFinish) {
      soundRef.current.stopAsync();
      soundRef.current.setPositionAsync(0);
    }
  };

  // --- Funções de Controle (Expo AV API) ---
  const playSound = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
    }
  };

  const pauseSound = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.setPositionAsync(0); // Rebobina
    }
  };

  // --- Renderização (React Native JSX) ---
  return (
    // Usar <View> em vez de <div>
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Usar <Text> em vez de <h1> */}
        <Text style={styles.title}>Reprodutor de Áudio</Text>
        <Text style={styles.subtitle}>Controle a sua música</Text>

        {/* Barra de Progresso */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${(progress / duration) * 100 || 0}%` },
            ]}
          />
        </View>

        {/* Tempos (usando <Text>) */}
        <View style={styles.timeDisplay}>
          <Text style={styles.timeText}>{formatTime(progress)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>

        {/* Controles (usando <Pressable> ou <Button>) */}
        <View style={styles.controls}>
          <Pressable
            onPress={playSound}
            disabled={isPlaying}
            style={[styles.button, styles.playButton, { opacity: isPlaying ? 0.6 : 1 }]}
          >
            <Ionicons name="play" size={24} color="white" />
          </Pressable>

          <Pressable
            onPress={pauseSound}
            disabled={!isPlaying}
            style={[styles.button, styles.pauseButton, { opacity: !isPlaying ? 0.6 : 1 }]}
          >
            <Ionicons name="pause" size={24} color="white" />
          </Pressable>

          <Pressable
            onPress={stopSound}
            style={[styles.button, styles.stopButton]}
          >
            <Ionicons name="stop" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// 4. Usar StyleSheet do React Native
const styles = StyleSheet.create({
  container: {
    flex: 1, // Em vez de 'minHeight: 100vh'
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7fafc",
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 32,
    borderRadius: 16,
    // Sombra (boxShadow) é diferente no React Native
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // Sombra para Android
    width: "100%",
    maxWidth: 448,
    alignItems: 'center', // Alinhar itens no card
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 8,
  },
  subtitle: {
    color: "#718096",
    marginBottom: 32,
    fontSize: 16,
  },
  progressContainer: {
    width: "100%",
    backgroundColor: "#e2e8f0",
    borderRadius: 9999,
    height: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: "#4299e1",
    height: "100%",
  },
  timeDisplay: {
    flexDirection: "row", // 'display: flex' é o padrão, mas a direção é 'column'. Usamos 'row' aqui.
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 24,
  },
  timeText: {
    fontSize: 14,
    color: "#718096",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32, // Metade da altura/largura para ser um círculo
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // Sombra leve
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
});