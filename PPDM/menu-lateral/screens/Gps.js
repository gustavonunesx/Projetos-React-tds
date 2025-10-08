import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Buscando localização...");
  const [watcher, setWatcher] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const locationRef = useRef(null);

  useEffect(() => {
    getInitialLocation();
    return () => stopTracking(); // limpa ao desmontar
  }, []);

  // Função para obter a localização inicial
  async function getInitialLocation() {
    setStatusMessage("Buscando localização...");

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setStatusMessage("Permissão negada");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
    setStatusMessage(
      `Latitude: ${currentLocation.coords.latitude.toFixed(5)} | Longitude: ${currentLocation.coords.longitude.toFixed(5)}`
    );
  }

  // Iniciar rastreamento contínuo
  async function startTracking() {
    setIsTracking(true);
    setStatusMessage("Rastreamento iniciado...");

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setStatusMessage("Permissão negada");
      setIsTracking(false);
      return;
    }

    // Atualiza a localização a cada 5 segundos (5000 ms)
    const watcherInstance = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 1,
      },
      (newLocation) => {
        setLocation(newLocation.coords);
        setStatusMessage(
          `Latitude: ${newLocation.coords.latitude.toFixed(5)} | Longitude: ${newLocation.coords.longitude.toFixed(5)}`
        );
      }
    );

    locationRef.current = watcherInstance;
    setWatcher(watcherInstance);
  }

  // Parar rastreamento
  function stopTracking() {
    if (locationRef.current) {
      locationRef.current.remove();
      locationRef.current = null;
      setWatcher(null);
    }
    setIsTracking(false);
    setStatusMessage("Rastreamento parado");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Rastreamento de Localização</Text>

      {location ? (
        <Text style={styles.text}>{statusMessage}</Text>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.text}>{statusMessage}</Text>
        </View>
      )}

      <View style={styles.buttons}>
        <Button
          title="Iniciar Rastreamento"
          onPress={startTracking}
          disabled={isTracking}
          color="#28a745"
        />
        <Button
          title="Parar Rastreamento"
          onPress={stopTracking}
          disabled={!isTracking}
          color="#dc3545"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  loading: {
    alignItems: "center",
  },
  buttons: {
    marginTop: 30,
    width: "80%",
    gap: 10,
  },
});
