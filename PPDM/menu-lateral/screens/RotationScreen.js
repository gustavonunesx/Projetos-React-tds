import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, PanResponder } from "react-native";

export default function RotationScreen() {
  const rotate = useRef(new Animated.Value(0)).current;
  const [angleDeg, setAngleDeg] = useState(0);
  const [boxColor, setBoxColor] = useState("#32CD32");

  const rotationAccum = useRef(0); // rotação acumulada
  const lastRotationRef = useRef(0);
  const center = { x: 0, y: 0 };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { moveX, moveY } = gestureState;
        const dx = moveX - center.x;
        const dy = moveY - center.y;

        let rad = Math.atan2(dy, dx);
        let delta = rad - lastRotationRef.current;
        delta *= 0.1; // reduz velocidade

        rotationAccum.current += delta;

        // Limitar ±180° (em radianos)
        if (rotationAccum.current > Math.PI) rotationAccum.current = Math.PI;
        if (rotationAccum.current < -Math.PI) rotationAccum.current = -Math.PI;

        lastRotationRef.current = rad;

        // Atualiza Animated.Value
        rotate.setValue(rotationAccum.current);

        // Atualiza ângulo em graus
        const deg = rotationAccum.current * (180 / Math.PI);
        setAngleDeg(deg.toFixed(2));

        // Troca cor em ±90°
        if (deg >= 90 || deg <= -90) setBoxColor("#3498db");
        else setBoxColor("#32CD32");
      },
      onPanResponderRelease: () => {
        lastRotationRef.current = 0; // reset da referência
      },
    })
  ).current;

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        const layout = e.nativeEvent.layout;
        center.x = layout.x + layout.width / 2;
        center.y = layout.y + layout.height / 2;
      }}
    >
      <Text style={styles.title}>Gire o quadrado com dois dedos ou mouse</Text>
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
                  outputRange: ["-180rad", "180rad"],
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
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  box: { width: 150, height: 150, borderRadius: 12 },
  angleText: { fontSize: 16, marginTop: 20 },
});
