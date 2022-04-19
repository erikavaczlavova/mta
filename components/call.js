import {Button, StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import RoomScreen from '../pages/RoomScreen';
import CallScreen from '../pages/CallScreen';
import JoinScreen from '../pages/JoinScreen';


const Call = props => {
  const screens = {
    ROOM: 'JOIN_ROOM',
    CALL: 'CALL',
    JOIN: 'JOIN',
  }

  const [screen, setScreen] = useState(screens.ROOM);
  const [roomId, setRoomId] = useState('');

  let content;

  switch (screen) {
    case screens.ROOM:
      content = <RoomScreen roomId={roomId} setRoomId={setRoomId} screens={screens} setScreen={setScreen} />
      break;

    case screens.CALL:
      content = <CallScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      break;

    case screens.JOIN:
      content = <JoinScreen roomId={roomId} screens={screens} setScreen={setScreen} />
      break;

    default:
      content = <Text>Wrong Screen</Text>
  }

  return (
    <SafeAreaView style={styles.container} >
      {content}
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  homeBody: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 2,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'olive',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 50,
    backgroundColor: 'red',
    height: 50,
    width: 200,
    marginVertical: 550,
  },
  butText: {
    color: 'white',
    fontSize: 25,
  },
});

export default Call;
