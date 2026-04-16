import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, StatusBar} from 'react-native'

import data from './data.json'
import { View } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'

function App() {
  return (
 <SafeAreaView  style={styles.container}>
    <FlatList 
    data={data}
    renderItem={({item}) => (
      <View style={styles.card}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.type}</Text>
      </View>
      )}
    />
</SafeAreaView>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  card: {
    padding: 10,
    backgroundColor: '#f5e8e8',
    borderRadius: 8,
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
  },
});
