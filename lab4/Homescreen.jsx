import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Student", { studentName: name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Student Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
