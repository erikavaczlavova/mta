import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home.js';
import NotHome from './pages/NotHome';
import Hamburger from './components/hamburger';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerStyle: {backgroundColor: 'red'}}}>
          <Stack.Screen name="Home" component={Home} options={styles.header} />
          <Stack.Screen
            name="NotHome"
            component={NotHome}
            options={styles.header}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  header: {
    headerTitleAlign: 'center',
    backgroundColor: 'red',
  },
  but: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
