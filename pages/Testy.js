import {Button, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';

const Testy = props => {
  const [isOn, setIsOn] = useState(true);
  const [data, setData] = useState([]);
  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Text>TestyAg TestyPCR Objednaj</Text>
        <Pressable
          style={styles.button}
          android_ripple={{color: 'black'}}
          onPress={getMoviesFromApi}>
          <Text style={styles.butText}>getttt tests</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const getMoviesFromApi = () => {
  return fetch('http://192.168.0.87:8000/test?user_id=9&type=PCR')
    .then(response => response.json())
    .then(json => {
      console.log(json.items[0]['location']);
    })
    .catch(error => {
      console.error(error);
    });
};

const styles = StyleSheet.create({
  homeBody: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 2,
    position: 'relative',
    backgroundColor: 'orange',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 50,
    backgroundColor: 'red',
    height: 100,
    width: 200,
  },
  butText: {
    color: 'white',
    fontSize: 25,
  },
});

export {Testy, getMoviesFromApi};
