import {StackActions} from '@react-navigation/native';
import React from 'react';
import {Button, StyleSheet, Text, View, Pressable} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Pcr from '../pages/Testy';
const Stack = createNativeStackNavigator();
/*
const Hamburger = props => {
  return (
    <View style={styles.hamburger}>
      <Button
        title="Moje AG testy"
        color="red"
        onPress={() => props.navigation.navigate('Home')}
      />
      <Button
        title="Moje PCR testy"
        color="red"
        onPress={() => props.navigation.navigate('Pcr')}
      />
      <Button
        title="Moje ockovanie"
        color="red"
        onPress={() => props.navigation.navigate('Ockovanie')}
      />
      <Button
        title="Covid-19 Pas"
        color="red"
        onPress={() => props.navigation.navigate('Pas')}
      />
      <Button
        title="Nahrat dokumenty"
        color="red"
        onPress={() => props.navigation.navigate('Doku')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hamburger: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    height: '100%',
    maxWidth: '30%',
    display: 'flex',
    paddingTop: 100,
  },
});
export default Hamburger;*/
