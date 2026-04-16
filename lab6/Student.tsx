import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar } from 'react-native';

import studentsData from './student.json';

interface Student {
  id: number;
  name: string;
  grade: string;
  section: string;
}

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.info}>Grade: {student.grade}</Text>
      <Text style={styles.info}>Section: {student.section}</Text>
    </View>
  );
};

const App: React.FC = () => {
  const renderItem = ({ item }: { item: Student }) => (
    <StudentCard student={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Student Directory</Text>
      <FlatList
        data={studentsData as Student[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    paddingTop: StatusBar.currentHeight
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  list: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 15,
    color: '#555',
  },
});
