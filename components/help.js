import {Button, StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';

const Help = props => {
  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Pressable style={styles.button} android_ripple={{color: 'black'}}>
          <Text style={styles.butText}>Hlavne priznaky covidu</Text>
        </Pressable>
        <Pressable style={styles.button} android_ripple={{color: 'black'}}>
          <Text style={styles.butText}>Som pozitivny, ako dalej?</Text>
        </Pressable>
        <Pressable style={styles.button} android_ripple={{color: 'black'}}>
          <Text style={styles.butText}>Aktualne opatrenia</Text>
        </Pressable>
        <Pressable style={styles.button} android_ripple={{color: 'black'}}>
          <Text style={styles.butText}>Karantena</Text>
        </Pressable>
        <Pressable style={styles.button} android_ripple={{color: 'black'}}>
          <Text style={styles.butText}>Ekonomicka pomoc</Text>
        </Pressable>
        <Pressable style={styles.button} android_ripple={{color: 'black'}}>
          <Text style={styles.butText}>Kontakty</Text>
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
    height: 60,
    width: 200,
    marginVertical: 25,
  },
  butText: {
    color: 'white',
    fontSize: 25,
  },
});

export default Help;
