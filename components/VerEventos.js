import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

const VerEventos = () => {
  const [eventos, setEventos] = useState([]);

  // Leer todos los eventos al montar la pantalla
  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "eventos"));
      const eventosLista = [];
      querySnapshot.forEach((doc) => {
        eventosLista.push({ ...doc.data(), id: doc.id });
      });
      setEventos(eventosLista);
    } catch (error) {
      console.error("Error al obtener eventos: ", error);
    }
  };

  const handleVerMas = (evento) => {
    const descripcion = evento.descripcion || "No hay descripción disponible";
    Alert.alert("Detalles del Evento", descripcion);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Disponibles</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            {/* Mostrar la imagen si existe en el campo 'imagen' */}
            {item.imagen ? (
              <Image source={{ uri: item.imagen }} style={styles.image} />
            ) : (
              <View style={styles.noImage}></View> // Si no hay imagen, mostrar un contenedor vacío
            )}
            <View style={styles.infoContainer}>
              {/* Nombre del evento */}
              <Text style={styles.eventName}>{item.nombre}</Text>
              {/* Lugar, Fecha y Hora */}
              <Text style={styles.eventDetail}>Lugar: {item.lugar}</Text>
              <Text style={styles.eventDetail}>Fecha: {item.fecha}</Text>
              <Text style={styles.eventDetail}>Hora: {item.hora}</Text>
              {/* Botón de Ver Más */}
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => handleVerMas(item)}
              >
                <Text style={styles.moreButtonText}>Ver Más</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f7fc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  noImage: {
    width: 80,
    height: 80,
    backgroundColor: "#e0e0e0", // Color de fondo si no hay imagen
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  eventDetail: {
    fontSize: 14,
    color: "#555",
  },
  moreButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  moreButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default VerEventos;
