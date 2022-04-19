import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  Button,
  View,
  TextInput,
  Pressable,
} from 'react-native';

export default function RoomScreen({setScreen, screens, setRoomId, roomId}) {
  const onCallOrJoin = screen => {
    if (roomId.length > 0) {
      setScreen(screen);
    }
  };

  return (
    <>
      <Text style={styles.heading}>Select a Room</Text>
      <TextInput style={styles.input} value={roomId} onChangeText={setRoomId} />
      <View style={styles.buttonContainer}>
        <Pressable
          android_ripple={{color: 'black'}}
          style={styles.button}
          onPress={() => onCallOrJoin(screens.JOIN)}>
          <Text style={styles.butText}>Join Screen</Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          android_ripple={{color: 'black'}}
          style={styles.button}
          onPress={() => onCallOrJoin(screens.CALL)}>
          <Text style={styles.butText}>Call Screen</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 30,
  },
  input: {
    alignSelf: 'center',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    width: 250,
  },
  buttonContainer: {
    margin: 5,
  },
  butText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 320,
    backgroundColor: 'tomato',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
});
