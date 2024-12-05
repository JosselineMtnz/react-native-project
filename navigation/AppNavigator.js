import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/HomeScreen';
import PacientesScreen from '../components/PacientesScreen';
import DoctoresScreen from '../components/DoctoresScreen';
import CitasScreen from '../components/CitasScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="Pacientes" component={PacientesScreen} options={{ title: 'Pacientes' }} />
      <Stack.Screen name="Doctores" component={DoctoresScreen} options={{ title: 'Doctores' }} />
      <Stack.Screen name="Citas" component={CitasScreen} options={{ title: 'Citas' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

