import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, Pressable} from 'react-native';

const MenuButton = props => {
  const switchu = () => {
    props.setIsOn(!props.isOn);
  };
  return (
    <Pressable onPress={switchu} style={styles.but}>
      <Text>Hello there /</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  but: {
    position: 'absolute',
    backgroundColor: 'purple',
    top: 0,
    left: 0,
  },
});

export default MenuButton;
