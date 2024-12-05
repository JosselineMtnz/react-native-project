import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RegisterForm from "../../components/RegisterForm";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <RegisterForm></RegisterForm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default RegisterScreen;
