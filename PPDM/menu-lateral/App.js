import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importa telas
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RotationScreen from "./screens/RotationScreen";
import ZoomScreen from "./screens/ZoomScreen";
import LongPressScreen from "./screens/LongPressScreen";
import SensorAcelerometro from "./screens/SensorAcelerometro";
import Gps from "./screens/Gps";
import Camera from "./screens/Camera";
import Wifi from "./screens/Wifi";


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Início">
        <Drawer.Screen name="Início" component={HomeScreen} />
        <Drawer.Screen name="Configurações" component={SettingsScreen} />
        <Drawer.Screen name="Rotação" component={RotationScreen} />
        <Drawer.Screen name="Zoom" component={ZoomScreen} />
        <Drawer.Screen name="LongPress" component={LongPressScreen} />
        <Drawer.Screen name="Sensor Acelerometro" component={SensorAcelerometro} />
        <Drawer.Screen name="GPS" component={Gps} />
        <Drawer.Screen name="Camera" component={Camera} />
        <Drawer.Screen name="Wifi" component={Wifi} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
