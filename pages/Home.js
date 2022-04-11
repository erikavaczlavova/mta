import {Button, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import Hamburger from '../components/hamburger';
import MenuButton from '../components/menuButton';

const Home = props => {
  const [isOn, setIsOn] = useState(true);
  return (
    <View style={styles.homeBody}>
      {isOn && <Hamburger navigation={props.navigation} />}
      <MenuButton isOn={isOn} setIsOn={setIsOn} />
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
    backgroundColor: 'purple',
    top: 0,
    left: 0,
  },
});

export default Home;
