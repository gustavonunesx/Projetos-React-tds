import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importa telas
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RotationScreen from "./screens/RotationScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Início">
        <Drawer.Screen name="Início" component={HomeScreen} />
        <Drawer.Screen name="Configurações" component={SettingsScreen} />
        <Drawer.Screen name="Rotação" component={RotationScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
