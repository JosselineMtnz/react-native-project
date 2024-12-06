import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../utils/firebaseConfig";
import { signOut } from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("Error al cerrar sesión:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Icon name="person" size={80} color="black" style={styles.icon} />
        <Text style={styles.welcomeText}>¡Bienvenido! </Text>
        <Text style={styles.welcomeText}>{userEmail}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Eventos")}
      >
        <Text style={styles.buttonText}>Ver eventos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NuevoEvento")}
      >
        <Text style={styles.buttonText}>Crear nuevo evento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSalir} onPress={handleLogout}>
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  welcomeContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40,
  },
  icon: {
    marginRight: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  button: {
    backgroundColor: "#4335A7",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
  },
  buttonSalir: {
    backgroundColor: "#FF2929",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default HomeScreen;
