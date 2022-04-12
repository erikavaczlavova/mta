import React from 'react';
import {Button, StyleSheet, Text, View, Pressable} from 'react-native';

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
  },
});
export default Hamburger;
