import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const StudentScreen = ({ route, navigation }) => {
  const { studentName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Information</Text>

      <Text style={styles.name}>Name: {studentName}</Text>

      <Text style={styles.message}>Welcome, {studentName}</Text>

      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
  },
});
