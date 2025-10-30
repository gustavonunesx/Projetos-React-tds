import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, PanResponder } from "react-native";

export default function RotationScreen() {
  // Valor animado para a rotação (em radianos)
  const rotate = useRef(new Animated.Value(0)).current;
  const [angleDeg, setAngleDeg] = useState(0);
  const [boxColor, setBoxColor] = useState("#32CD32"); // verde inicial

  const rotationAccum = useRef(0); // rotação acumulada total
  const lastRotationRef = useRef(0);
  const center = useRef({ x: 0, y: 0 }).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        // Define a posição inicial da rotação
        const { moveX, moveY } = gestureState;
        const dx = moveX - center.x;
        const dy = moveY - center.y;
        lastRotationRef.current = Math.atan2(dy, dx);
      },
      onPanResponderMove: (_, gestureState) => {
        const { moveX, moveY } = gestureState;
        const dx = moveX - center.x;
        const dy = moveY - center.y;

        // Calcula o ângulo atual
        const rad = Math.atan2(dy, dx);
        let delta = rad - lastRotationRef.current;

        // Normaliza o delta para evitar saltos
        if (delta > Math.PI) delta -= 2 * Math.PI;
        if (delta < -Math.PI) delta += 2 * Math.PI;

        // Acumula a rotação
        rotationAccum.current += delta * 0.8; // suaviza o movimento

        // Limita a rotação a ±180° (em radianos)
        const maxRotation = Math.PI;
        if (rotationAccum.current > maxRotation)
          rotationAccum.current = maxRotation;
        if (rotationAccum.current < -maxRotation)
          rotationAccum.current = -maxRotation;

        // Atualiza o valor animado e o último ângulo
        rotate.setValue(rotationAccum.current);
        lastRotationRef.current = rad;

        // Atualiza o ângulo em graus
        const deg = rotationAccum.current * (180 / Math.PI);
        setAngleDeg(deg.toFixed(2));

        // Troca cor ao atingir ±90°
        if (deg >= 90 || deg <= -90) setBoxColor("#3498db"); // azul
        else setBoxColor("#32CD32"); // verde
      },
      onPanResponderRelease: () => {
        lastRotationRef.current = 0;
      },
    })
  ).current;

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        const { x, y, width, height } = e.nativeEvent.layout;
        center.x = x + width / 2;
        center.y = y + height / 2;
      }}
    >
      <Text style={styles.title}>🔄 Rotação do Quadrado</Text>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.box,
          {
            backgroundColor: boxColor,
            transform: [
              {
                rotate: rotate.interpolate({
                  inputRange: [-Math.PI, Math.PI],
                  outputRange: ["-180deg", "180deg"],
                }),
              },
            ],
          },
        ]}
      />

      <Text style={styles.angleText}>Ângulo atual: {angleDeg}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  box: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  angleText: {
    fontSize: 16,
    marginTop: 20,
  },
});
