import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import OrderDetails from "./OrderDetails"
const Stack = createNativeStackNavigator();
const App = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name = "Home" component={Home}/>
      <Stack.Screen name = "OrderDetails" component={OrderDetails}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})