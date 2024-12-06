import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const NuevoEvento = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [lugar, setLugar] = useState("");
  const [imagen, setImagen] = useState(""); // URL de la imagen

  // Función para guardar el evento en Firestore
  const guardarEvento = async () => {
    if (!nombre || !descripcion || !fecha || !hora || !lugar || !imagen) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      // Agregar el nuevo evento a la colección 'eventos'
      await addDoc(collection(db, "eventos"), {
        nombre,
        descripcion,
        fecha,
        hora,
        lugar,
        imagen,
      });
      Alert.alert("Éxito", "El evento ha sido agregado correctamente");
      limpiarCampos();
    } catch (error) {
      console.error("Error al guardar el evento: ", error);
      Alert.alert("Error", "Hubo un problema al guardar el evento");
    }
  };

  // Limpiar los campos del formulario
  const limpiarCampos = () => {
    setNombre("");
    setDescripcion("");
    setFecha("");
    setHora("");
    setLugar("");
    setImagen("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>

      {/* Campo para el nombre del evento */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del Evento"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Campo para la descripción del evento */}
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {/* Campo para la fecha del evento */}
      <TextInput
        style={styles.input}
        placeholder="Fecha (DD-MM-AAAA)"
        value={fecha}
        onChangeText={setFecha}
      />

      {/* Campo para la hora del evento */}
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={hora}
        onChangeText={setHora}
      />

      {/* Campo para el lugar del evento */}
      <TextInput
        style={styles.input}
        placeholder="Lugar"
        value={lugar}
        onChangeText={setLugar}
      />

      {/* Campo para la URL de la imagen */}
      <TextInput
        style={styles.input}
        placeholder="URL de la Imagen"
        value={imagen}
        onChangeText={setImagen}
      />

      {/* Botón para guardar el evento */}
      <TouchableOpacity style={styles.button} onPress={guardarEvento}>
        <Text style={styles.buttonText}>Guardar evento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#f4f7fc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // Para Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NuevoEvento;
