import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Asilo Esperanza de Santa Ana</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pacientes')}
      >
        <Text style={styles.buttonText}>Pacientes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Doctores')}
      >
        <Text style={styles.buttonText}>Doctores</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Citas')}
      >
        <Text style={styles.buttonText}>Citas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5', // Fondo más claro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50', // Color verde
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%', // Ancho del botón
  },
  buttonText: {
    color: '#ffffff', // Color del texto
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
