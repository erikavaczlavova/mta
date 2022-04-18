import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './pages/Home.js';
import Ockovanie from './pages/Ockovanie.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Testy} from './pages/Testy.js';
import Profil from './pages/Profil.js';
import FlashMessage from 'react-native-flash-message';
import Login from './pages/Login.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  Text,
  RecyclerViewBackedScrollView,
  SafeAreaView,
} from 'react-native';
import RoomScreen from './pages/RoomScreen.js';
import CallScreen from './pages/CallScreen.js';
import JoinScreen from './pages/JoinScreen.js';

const Tab = createBottomTabNavigator();
global.userid = 0;

export default function App() {
  const screens = {
    ROOM: 'JOIN_ROOM',
    CALL: 'CALL',
    JOIN: 'JOIN',
  };

  const [screen, setScreen] = useState(screens.ROOM);
  const [roomId, setRoomId] = useState('');

  let content;

  switch (screen) {
    case screens.ROOM:
      content = (
        <RoomScreen
          roomId={roomId}
          setRoomId={setRoomId}
          screens={screens}
          setScreen={setScreen}
        />
      );
      break;

    case screens.CALL:
      content = (
        <CallScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      );
      break;

    case screens.JOIN:
      content = (
        <JoinScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      );
      break;

    default:
      content = <Text>Wrong Screen</Text>;
  }

  return <SafeAreaView style={styles.container}>{content}</SafeAreaView>;
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
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
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
  header: {
    headerTitleStyle: {color: 'red', fontSize: 25},
    headerTitleAlign: 'center',
    backgroundColor: 'red',
  },
});
