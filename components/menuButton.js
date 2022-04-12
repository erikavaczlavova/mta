import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, Pressable} from 'react-native';

const MenuButton = props => {
  const switchu = () => {
    props.setIsOn(!props.isOn);
  };
  return (
    <Pressable onPress={switchu} style={styles.but}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
        Menu
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  but: {
    position: 'absolute',
    backgroundColor: 'red',
    top: 0,
    left: 0,
    width: '33%',
    padding: 10,
  },
});

export default MenuButton;
