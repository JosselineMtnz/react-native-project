import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginForm from "../../components/LoginForm";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default LoginScreen;
