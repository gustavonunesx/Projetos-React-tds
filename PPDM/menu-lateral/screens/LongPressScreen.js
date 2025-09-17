import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";

export default function LongPressScreen() {
  const [boxColor, setBoxColor] = useState("#FF6347"); // vermelho inicial
  const [message, setMessage] = useState("Pressione e segure o quadrado");
  const [longPressCount, setLongPressCount] = useState(0);

  const minDuration = 1000; // 1 segundo

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Quando começa o toque longo
      setBoxColor("#32CD32"); // verde
      setMessage("Segurando...");
    } else if (event.nativeEvent.state === State.END || event.nativeEvent.state === State.CANCELLED) {
      // Quando solta
      setBoxColor("#FF6347"); // volta ao vermelho
      setMessage("Você fez um toque longo!");
      setLongPressCount(longPressCount + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Toques longos: {longPressCount}</Text>
      <Text style={styles.title}>{message}</Text>
      <LongPressGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        minDurationMs={minDuration}
      >
        <View style={[styles.box, { backgroundColor: boxColor }]}>
          <Text style={styles.boxText}>Segure-me</Text>
        </View>
      </LongPressGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  counter: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  title: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  box: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  boxText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
