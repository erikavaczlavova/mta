import {Button, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';

const TestVacc = props => {
  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Pressable style={styles.button} android_ripple={{color: 'black'}}>
          <Text style={styles.butText}>Save</Text>
        </Pressable>
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
    backgroundColor: 'olive',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 50,
    backgroundColor: 'red',
    height: 50,
    width: 200,
    marginVertical: 550,
  },
  butText: {
    color: 'white',
    fontSize: 25,
  },
});

export default TestVacc;
