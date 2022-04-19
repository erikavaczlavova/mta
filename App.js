import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  RecyclerViewBackedScrollView,
} from 'react-native';
import RoomScreen from './pages/RoomScreen';
import CallScreen from './pages/CallScreen';
import JoinScreen from './pages/JoinScreen';

import {NavigationContainer} from '@react-navigation/native';
import Home from './pages/Home.js';
import Ockovanie from './pages/Ockovanie.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Testy} from './pages/Testy.js';
import Profil from './pages/Profil.js';
import FlashMessage from 'react-native-flash-message';
import Login from './pages/Login.js';

const Tab = createBottomTabNavigator();
global.userid = 0;
global.ip = '192.168.0.108';

// Just to handle navigation
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
          <Tab.Screen name="Login" component={Login} options={styles.header} />
          <Tab.Screen name="Home" component={Home} options={styles.header} />
          <Tab.Screen name="Testy" component={Testy} options={styles.header} />
          <Tab.Screen
            name="Ockovanie"
            component={Ockovanie}
            options={styles.header}
          />
          <Tab.Screen
            name="Profil"
            component={Profil}
            options={styles.header}
          />
        </Tab.Group>
      </Tab.Navigator>
      <FlashMessage position="center" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    headerTitleStyle: {color: 'red', fontSize: 25},
    headerTitleAlign: 'center',
    backgroundColor: 'red',
  },
});
