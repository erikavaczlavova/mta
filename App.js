import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, Pressable} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home.js';
import Hamburger from './components/hamburger';
import Pcr from './pages/Testy.js';
import Ockovanie from './pages/Ockovanie.js';
import Doku from './pages/Profil.js';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Testy from './pages/Testy.js';
import Profil from './pages/Profil.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'white',
          tabBarActiveBackgroundColor: 'red',
          tabBarInactiveBackgroundColor: 'red',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}>
        <Tab.Group screenOptions={{headerStyle: {backgroundColor: 'red'}}}>
          <Tab.Screen name="Testy" component={Testy} options={styles.header} />
          <Tab.Screen
            name="Ockovanie"
            component={Ockovanie}
            options={styles.header}
          />
          <Tab.Screen name="Home" component={Home} options={styles.header} />
          <Tab.Screen
            name="Profil"
            component={Profil}
            options={styles.header}
          />
        </Tab.Group>
      </Tab.Navigator>
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
    headerTitleStyle: {color: 'white', fontSize: 25},
    headerTitleAlign: 'center',
    backgroundColor: 'red',
  },
  but: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
