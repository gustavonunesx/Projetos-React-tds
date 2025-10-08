import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo';

export default function NetworkStatus() {
  const [netInfo, setNetInfo] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionGranted(status === 'granted');
    })();

    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state);
    });

    NetInfo.fetch().then(state => setNetInfo(state));

    return () => unsubscribe();
  }, []);

  const refresh = async () => {
    const state = await NetInfo.fetch();
    setNetInfo(state);
  };

  const renderContent = () => {
    if (!netInfo) return <Text>Buscando estado da rede...</Text>;

    return (
      <>
        <Text>Conectado: {netInfo.isConnected ? 'Sim' : 'Não'}</Text>
        <Text>Tipo de conexão: {netInfo.type}</Text>
        <Text>
          Internet alcançável:{' '}
          {netInfo.isInternetReachable === null
            ? '-'
            : netInfo.isInternetReachable
            ? 'Sim'
            : 'Não'}
        </Text>
        <Text>
          SSID:{' '}
          {netInfo.details && netInfo.details.ssid
            ? netInfo.details.ssid
            : 'Indisponível / null'}
        </Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wi-Fi / Conexão - Status</Text>

      {renderContent()}

      <Button title="Atualizar" onPress={refresh} />

      <Text>
        Permissão de localização: {permissionGranted ? 'Concedida' : 'Não concedida'}
      </Text>

      <Text style={styles.note}>
        Observação: para acessar o SSID no Android, é necessário conceder permissão de
        localização; no iOS, exige configuração adicional.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  line: { marginBottom: 8, fontSize: 16 },
  small: { fontSize: 14, marginTop: 8 },
  note: { marginTop: 12, fontSize: 13, color: '#555' },
});
