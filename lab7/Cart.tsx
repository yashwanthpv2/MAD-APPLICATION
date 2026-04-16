import React from 'react'
import { View, Text, Button } from 'react-native'

const Cart = ({ navigation }: any) => {
  return (
    <View>

      <Text style={{fontSize:22}}>Your Cart</Text>

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />

    </View>
  )
}

export default Cart
