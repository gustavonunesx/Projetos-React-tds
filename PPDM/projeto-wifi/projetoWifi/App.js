import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  Alert, 
  FlatList 
} from 'react-native';
import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo';
import { Ionicons } from '@expo/vector-icons'; // Ícones bonitos

export default function MonitorConexao() {
  const [netInfo, setNetInfo] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Pede permissão de localização (necessário no Android)
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionGranted(status === 'granted');
    })();

    // Monitora mudanças de conexão
    const unsubscribe = NetInfo.addEventListener(state => {
      handleNetInfoChange(state);
    });

    // Busca o estado inicial
    NetInfo.fetch().then(state => handleNetInfoChange(state));

    return () => unsubscribe();
  }, []);

  const handleNetInfoChange = (state) => {
    if (netInfo && netInfo.isConnected && !state.isConnected) {
      Alert.alert('Conexão perdida', 'Você ficou sem internet!');
    }

    setNetInfo(state);

    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    const statusText = state.isConnected
      ? `Conectado (${state.type}${state.details?.ssid ? ` - ${state.details.ssid}` : ''})`
      : 'Desconectado';

    setHistory(prev => [
      { id: String(prev.length + 1), time: timestamp, status: statusText },
      ...prev,
    ]);
  };

  const refresh = async () => {
    const state = await NetInfo.fetch();
    handleNetInfoChange(state);
  };

  const renderConnectionIcon = () => {
    if (!netInfo) return null;
    return (
      <Ionicons
        name={netInfo.isConnected ? 'wifi' : 'wifi-off'}
        size={64}
        color={netInfo.isConnected ? 'green' : 'red'}
        style={{ alignSelf: 'center', marginBottom: 10 }}
      />
    );
  };

  const renderContent = () => {
    if (!netInfo) return <Text>Buscando estado da rede...</Text>;

    return (
      <>
        <Text style={styles.line}>
          Conectado: {netInfo.isConnected ? 'Sim' : 'Não'}
        </Text>
        <Text style={styles.line}>
          Tipo de conexão: {netInfo.type}
        </Text>
        <Text style={styles.line}>
          Internet alcançável:{' '}
          {netInfo.isInternetReachable === null
            ? '-'
            : netInfo.isInternetReachable
            ? 'Sim'
            : 'Não'}
        </Text>
        <Text style={styles.line}>
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
      <Text style={styles.title}>Monitor de Conexão Wi-Fi</Text>

      {renderConnectionIcon()}
      {renderContent()}

      <Button title="Atualizar status" onPress={refresh} />

      <Text style={styles.permission}>
        Permissão de localização:{' '}
        {permissionGranted ? 'Concedida' : 'Não concedida'}
      </Text>

      {!permissionGranted && (
        <Text style={styles.note}>
          ⚠️ É necessário conceder permissão de localização para exibir o SSID no Android.
        </Text>
      )}

      <Text style={styles.historyTitle}>Histórico de conexões:</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>
            {item.time} — {item.status}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  line: { marginBottom: 8, fontSize: 16 },
  permission: { marginTop: 10, fontSize: 15, fontWeight: '500' },
  note: { marginTop: 8, fontSize: 13, color: '#555' },
  historyTitle: { marginTop: 20, fontSize: 18, fontWeight: 'bold' },
  historyItem: { fontSize: 14, marginTop: 4, borderBottomWidth: 0.5, borderColor: '#ccc' },
});
