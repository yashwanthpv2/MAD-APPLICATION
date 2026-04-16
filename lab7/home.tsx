import React from 'react'
import { View, Text, Button } from 'react-native'

const Home = ({ navigation }: any) => {
  return (
    <View>

      <Text style={{fontSize:22}}>
        Welcome to My Store
      </Text>

      <Button
        title="View Product"
        onPress={() => navigation.navigate('Details')}
      />

    </View>
  )
}

export default Home
