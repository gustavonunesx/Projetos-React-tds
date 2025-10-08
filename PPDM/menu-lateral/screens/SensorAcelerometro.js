import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const [history, setHistory] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const THRESHOLD = 1.5; // limite de aceleração para alerta

  const subscribe = () => {
    const sub = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);

      // Atualiza histórico dos últimos 10 valores
      setHistory(prev => {
        const newHist = [accelerometerData, ...prev];
        return newHist.slice(0, 10);
      });

      // Alerta se ultrapassar limite
      const totalAcceleration = Math.sqrt(
        accelerometerData.x ** 2 +
        accelerometerData.y ** 2 +
        accelerometerData.z ** 2
      );
      if (totalAcceleration > THRESHOLD) {
        Alert.alert('Alerta', 'Sacudida detectada!');
      }
    });
    setSubscription(sub);
    Accelerometer.setUpdateInterval(500); // 0.5s
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  const toggle = () => {
    if (isActive) {
      unsubscribe();
      setIsActive(false);
    } else {
      subscribe();
      setIsActive(true);
    }
  };

  const { x, y, z } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leitura do Acelerômetro</Text>
      <View style={styles.dataBox}>
        <Text style={styles.text}>Eixo X: {x.toFixed(2)}</Text>
        <Text style={styles.text}>Eixo Y: {y.toFixed(2)}</Text>
        <Text style={styles.text}>Eixo Z: {z.toFixed(2)}</Text>
      </View>
      <Button
        title={isActive ? 'Pausar Leitura' : 'Retomar Leitura'}
        onPress={toggle}
      />

      <Text style={styles.info}>Histórico (últimos 10 valores):</Text>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.text}>
            {index + 1}: X={item.x.toFixed(2)} Y={item.y.toFixed(2)} Z={item.z.toFixed(2)}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  dataBox: {
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  text: {
    color: '#00ff99',
    fontSize: 18,
    marginVertical: 5,
  },
  info: {
    marginTop: 20,
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
