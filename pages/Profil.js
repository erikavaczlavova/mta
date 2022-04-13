import {Button, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';

const Profil = props => {
  const [isOn, setIsOn] = useState(true);
  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Text>Profil a Dokumenty</Text>
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
    backgroundColor: 'tomato',
    height: '100%',
  },
});

export default Profil;
