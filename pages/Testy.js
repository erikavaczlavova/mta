import {Button, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import Hamburger from '../components/hamburger';
import MenuButton from '../components/menuButton';

const Testy = props => {
  const [isOn, setIsOn] = useState(true);
  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Text>TestyAg TestyPCR Objednaj</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
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
  but: {
    position: 'absolute',
    backgroundColor: 'red',
    width: '100%',
    padding: 2,
    top: 0,
    left: 0,
  },
});

export default Testy;