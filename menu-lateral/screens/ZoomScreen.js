import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from "react-native";
import { PinchGestureHandler } from "react-native-gesture-handler";

export default function ZoomScreen() {
  const scale = useRef(new Animated.Value(1)).current; // escala inicial
  const [zoomText, setZoomText] = useState("Zoom: 1.0x");

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const zoomLevel = event.nativeEvent.scale;
        setZoomText(`Zoom: ${zoomLevel.toFixed(2)}x`);
      },
    }
  );

  const resetScale = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setZoomText("Zoom: 1.0x");
  };

  return (
    <TouchableWithoutFeedback onPress={resetScale}>
      <View style={styles.container}>
        <Text style={styles.title}>Pinch para aumentar/diminuir</Text>
        <PinchGestureHandler onGestureEvent={onPinchEvent}>
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{ scale }],
              },
            ]}
          />
        </PinchGestureHandler>
        <Text style={styles.zoomText}>{zoomText}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  box: { width: 150, height: 150, backgroundColor: "#1E90FF", borderRadius: 12 },
  zoomText: { fontSize: 16, marginTop: 20 },
});
