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
        onPress={() => props.navigation.navigate('NotHome')}
      />
      <Button
        title="Moje ockovanie"
        color="red"
        onPress={() => props.navigation.navigate('NotHome')}
      />
      <Button
        title="Covid-19 Pas"
        color="red"
        onPress={() => props.navigation.navigate('NotHome')}
      />
      <Button
        title="Nahrat dokumenty"
        color="red"
        onPress={() => props.navigation.navigate('NotHome')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hamburger: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    height: '40%',
    maxWidth: '30%',
    display: 'flex',
    paddingTop: 30,
  },
});
export default Hamburger;
