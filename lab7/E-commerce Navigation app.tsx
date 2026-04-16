import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/screens/Home'
import ProductDetails from './src/screens/ProductDetails'
import Cart from './src/screens/Cart'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="Details"
          component={ProductDetails}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
