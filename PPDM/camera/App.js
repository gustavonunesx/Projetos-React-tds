import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [permission, setPermission] = useState(null);
  const [mediaPermission, setMediaPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  // Solicita permissões
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');

      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(mediaStatus.status === 'granted');
    })();
  }, []);

  // Caso permissão não concedida
  if (permission === false) {
    return (
      <View style={styles.container}>
        <Text>Precisamos da permissão para usar a câmera!</Text>
        <Button
          title="Conceder permissão"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
          }}
        />
      </View>
    );
  }

  // Função para tirar foto
  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri);
      if (mediaPermission) {
        await MediaLibrary.saveToLibraryAsync(photoData.uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!photo ? (
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.captureButton} />
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <Button title="Tirar outra foto" onPress={() => setPhoto(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { flex: 1, width: '100%' },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  captureButton: { width: 80, height: 80, backgroundColor: 'white', borderRadius: 50 },
  previewContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  preview: { width: '90%', height: '70%', borderRadius: 10, marginBottom: 20 },
});
