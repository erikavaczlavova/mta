import React from 'react';
import { Button, StyleSheet, Text, View, Pressable } from 'react-native';
const Hamburger = (props) =>{
  return(
 <View style={styles.hamburger}>
    <Button title="NotHome" color="blue" onPress={() =>
    props.navigation.navigate('NotHome')
  } />
    <Button title="Home" color="blue" onPress={() =>
    props.navigation.navigate('Home')
  } />
    </View>

  )
}

const styles = StyleSheet.create({
hamburger: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: 'green',
  height: '100%',
  maxWidth: '30%',
  display: 'flex',
  paddingTop: 30
}
});
export default Hamburger;