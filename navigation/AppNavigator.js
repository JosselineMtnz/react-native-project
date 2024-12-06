import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import EventosScreen from "../components/VerEventos";
import NuevoEventoScreen from "../components/NuevoEvento";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen
        name="Eventos"
        component={EventosScreen}
        options={{ title: "Eventos" }}
      />
      <Stack.Screen
        name="NuevoEvento"
        component={NuevoEventoScreen}
        options={{ title: "NuevoEvento" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;
