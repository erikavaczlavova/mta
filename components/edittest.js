import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {showMessage, hideMessage} from 'react-native-flash-message';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const EditTest = props => {
  const radio = [
    {label: 'DEL', value: 0},
    {label: 'PCR', value: 1},
    {label: 'AG', value: 2},
  ];
  const [decision, setDec] = useState('DEL');
  const [newplace, setPlac] = useState('');
  const result = ['DEL', 'PCR', 'AG'];
  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Text style={{fontSize: 35, color: 'black'}}>
          Preobjednanie testu:{' '}
        </Text>
        <Text style={{color: 'black', fontSize: 22, top: 15}}>
          Povodny typ : {props.editType} {'\n'}
        </Text>
        <Text style={{color: 'black', fontSize: 22, top: 5, bottom: 10}}>
          Novy typ : {'\n'}
        </Text>
        <RadioForm
          radio_props={radio}
          buttonColor="red"
          color="red"
          onPress={value => {
            setDec(result[value]);
          }}
        />
        <Text style={{color: 'black', fontSize: 22, top: 15}}>
          {'\n'} Povodne mesto : {props.editLoc} {'\n'}
        </Text>
        <Text style={{color: 'black', fontSize: 22, top: 5, bottom: 10}}>
          Nove mesto:{' '}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Mesto"
          onChangeText={value => {
            setPlac(value);
          }}></TextInput>
        <Text style={{color: 'black', fontSize: 22, top: 5, bottom: 10}}>
          Datum: {props.date}
        </Text>
        <Pressable
          style={styles.button}
          android_ripple={{color: 'black'}}
          onPress={async () => {
            console.log(decision);
            if (decision == 'DEL') {
              showMessage({
                message: 'Uspesne zrusene',
                type: 'success',
              });
              props.setEdit(false);
              props.setIsOn(true);
              return await fetch(
                `http://${global.ip}:8000/test?id=${props.editID}`,
                {
                  method: 'DELETE',
                },
              );
            } else {
              if (newplace.length > 2) {
                showMessage({
                  message: 'Uspesne zmenene',
                  type: 'success',
                });
                let body = {
                  id: props.editID,
                  location: newplace,
                  type: decision,
                };
                props.setEdit(false);
                props.setIsOn(true);
                return await fetch(`http://${global.ip}:8000/test`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(body),
                });
              } else {
                showMessage({
                  message: 'Zadajte mesto',
                  type: 'warning',
                });
              }
            }
          }}>
          <Text style={styles.butText}>Ulozit</Text>
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
    width: 200,
    marginVertical: 100,
  },
  butText: {
    color: 'white',
    fontSize: 25,
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
    width: 250,
  },
});

export default EditTest;
