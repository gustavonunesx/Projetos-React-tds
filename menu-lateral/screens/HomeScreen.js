import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  // Lista de cores para trocar
  const colors = ["#3498db", "#2ecc71", "#e74c3c"]; // azul, verde, vermelho

  const onSingleTap = () => {
    setCount(count + 1);
    setColorIndex((colorIndex + 1) % colors.length); // alterna entre 0,1,2
  };

  const resetCount = () => {
    setCount(0);
    setColorIndex(0); // opcional: volta cor inicial
  };

  return (
    <TapGestureHandler onActivated={onSingleTap}>
      <View style={[styles.container, { backgroundColor: colors[colorIndex] }]}>
        <Text style={styles.text}>Toque na tela</Text>
        <Text style={styles.text}>Contagem de toques: {count}</Text>
        <View style={{ marginTop: 20 }}>
          <Button title="Resetar" onPress={resetCount} />
        </View>
      </View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
    margin: 10,
  },
});
