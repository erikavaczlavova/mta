import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';

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
  const [dateInput, setDI] = useState('YYYY-MM-DD');
  const [locInput, setLI] = useState('Mesto');
  const [typeInput, setTI] = useState('');
  const radio = [
    {label: 'Vaccine', value: 0},
    {label: 'Test', value: 1},
  ];
  const result = ['Vaccine', 'Test'];
  const doctors = ['Velky', 'Kolenik', 'Stromokocur'];
  const name = ['Pfizer', 'Moderna', 'J&J', 'Astra'];

  const putTest = async () => {
    let body = {
      user_id: global.userid,
      location: newplace,
      type: newtype,
      date: newdate,
    };
    return await fetch('http://192.168.0.108:8000/test', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  const putVacc = async () => {
    let body = {
      user_id: global.userid,
      location: newplace,
      dose: newtype,
      date: newdate,
      doctor: newdoc,
      name: newvacc,
    };
    return await fetch('http://192.168.0.108:8000/vaccine', {
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
          defaultValue={locInput}
          fontSize={20}
          onChangeText={value => {
            setPlac(value), setLI(value);
          }}></TextInput>
        <Text style={styles.label}>Datum:</Text>
        <TextInput
          style={styles.input}
          defaultValue={dateInput}
          fontSize={20}
          onChangeText={value => {
            setDate(value + 'T09:12:33.001Z'), setDI(value);
          }}></TextInput>
        <Text style={styles.label}>{type}</Text>
        <TextInput
          style={styles.input}
          defaultValue={typeInput}
          fontSize={20}
          onChangeText={value => {
            setNType(value), setTI(value);
          }}></TextInput>
        <Pressable
          style={styles.button}
          android_ripple={{color: 'black'}}
          onPress={() => {
            if (global.userid != 0) {
              if (type == 'Davka:') {
                if (
                  newtype > 0 &&
                  newplace.length > 2 &&
                  moment(newdate.split('T')[0], 'YYYY-MM-DD', true).isValid()
                ) {
                  setDoc(doctors[Math.floor(Math.random() * doctors.length)]);
                  setVacc(name[Math.floor(Math.random() * name.length)]);
                  putVacc();
                  showMessage({
                    message: 'Termin zaregistrovany',
                    type: 'success',
                  });
                  setDI('YYYY-MM-DD');
                  setLI('Mesto');
                  setTI('');
                  setPlac('');
                  setDate('');
                  setNType('');
                } else {
                  showMessage({
                    message: 'Zly format',
                    description:
                      'Mesto: vyplnene, Datum: YYYY-MM-DD, Davka: 1-5',
                    type: 'warning',
                  });
                }
              } else {
                if (
                  (newtype == 'AG' || newtype == 'PCR') &&
                  newplace.length > 2 &&
                  moment(newdate.split('T')[0], 'YYYY-MM-DD', true).isValid()
                ) {
                  putTest();
                  showMessage({
                    message: 'Termin zaregistrovany',
                    type: 'success',
                  });
                  setDI('YYYY-MM-DD');
                  setLI('Mesto');
                  setTI('');
                  setPlac('');
                  setDate('');
                  setNType('');
                } else {
                  showMessage({
                    message: 'Zly format',
                    description:
                      'Mesto: vyplnene, Datum: YYYY-MM-DD, Typ: AG/PCR',
                    type: 'warning',
                  });
                }
              }
            } else {
              setDI('');
              setLI('');
              setTI('');
              showMessage({
                message: 'Uzivatel nie je prihlaseny',
                type: 'warning',
              });
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
