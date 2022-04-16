import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const TestVacc = props => {
  const [type, setType] = useState('Davka:');
  const [newplace, setPlac] = useState('');
  const [newdate, setDate] = useState('');
  const [newtype, setNType] = useState('');
  const [newdoc, setDoc] = useState('');
  const [newvacc, setVacc] = useState('');
  const radio = [
    {label: 'Vaccine', value: 0},
    {label: 'Test', value: 1},
  ];
  const result = ['Vaccine', 'Test'];
  const doctors = ['Velky', 'Kolenik', 'Stromokocur'];
  const name = ['Pfizer', 'Moderna', 'J&J', 'Astra'];

  const putTest = async () => {
    let body = {
      user_id: 10,
      location: newplace,
      type: newtype,
      date: newdate,
    };
    return await fetch('http://192.168.0.87:8000/test', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  const putVacc = async () => {
    let body = {
      user_id: 10,
      location: newplace,
      dose: newtype,
      date: newdate,
      doctor: newdoc,
      name: newvacc,
    };
    return await fetch('http://192.168.0.87:8000/vaccine', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 35,
            margin: 10,
            left: 10,
          }}>
          Novy termin na:{'\n'}
        </Text>
        <RadioForm
          radio_props={radio}
          buttonColor="red"
          color="red"
          onPress={value => {
            if (result[value] == 'Vaccine') {
              setType('Davka:');
            } else {
              setType('Typ:');
            }
          }}
        />
        <Text style={styles.label}>{'\n\n'}Mesto:</Text>
        <TextInput
          style={styles.input}
          defaultValue="Mesto"
          fontSize={20}
          onChangeText={value => setPlac(value)}></TextInput>
        <Text style={styles.label}>Datum:</Text>
        <TextInput
          style={styles.input}
          defaultValue="Datum"
          fontSize={20}
          onChangeText={value => setDate(value + 'T09:12:33.001Z')}></TextInput>
        <Text style={styles.label}>{type}</Text>
        <TextInput
          style={styles.input}
          defaultValue=""
          fontSize={20}
          onChangeText={value => setNType(value)}></TextInput>
        <Pressable
          style={styles.button}
          android_ripple={{color: 'black'}}
          onPress={() => {
            if (type == 'Davka:') {
              setDoc(doctors[Math.floor(Math.random() * doctors.length)]);
              setVacc(name[Math.floor(Math.random() * name.length)]);
              putVacc();
            } else {
              putTest();
            }
          }}>
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
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    height: 50,
    width: 320,
    marginVertical: 5,
    position: 'relative',
    bottom: -100,
  },
  butText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    width: 250,
    left: 35,
    bottom: 30,
  },
  label: {
    color: 'black',
    fontSize: 22,
    top: 3,
    bottom: 10,
    left: -135,
  },
});

export default TestVacc;
