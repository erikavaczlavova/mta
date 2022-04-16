import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import Files from '../components/files';

const Profil = props => {
  const [isOn, setIsOn] = useState(true);
  const [butt, setButt] = useState(false);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [data, setData] = useState({
    birthdate: '',
    birthnum: '',
    height: null,
    id: 1,
    name: '',
    password: '1111',
    weight: null,
  });

  const getProfil = () => {
    setIsOn(true);
    return fetch('http://192.168.0.87:8000/user?id=7')
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const back = () => {
    console.log(isOn, butt, add, show);
    if (butt) {
      setIsOn(true);
    }
    if (add || show) {
      setAdd(false);
      setShow(false);
      setButt(true);
    }

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', back);

    return () => BackHandler.removeEventListener('hardwareBackPress', back);
  }, [isOn, butt, add, show]);

  return (
    <View style={styles.homeBody}>
      {isOn ? (
        <View style={styles.body}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 35,
              margin: 10,
              left: 10,
            }}>
            Profil:
          </Text>
          <Text
            style={{
              color: 'black',
              left: 21,
              fontSize: 22,
              top: 5,
              bottom: 10,
            }}>
            Meno:
          </Text>
          <TextInput
            style={styles.input}
            value={data.name}
            editable={false}
            fontSize={20}></TextInput>
          <Text style={{color: 'black', left: 21, fontSize: 22, bottom: 40}}>
            Rodne {'\n'}cislo:
          </Text>
          <TextInput
            style={styles.input2}
            value={data.birthnum}
            fontSize={20}></TextInput>
          <Text style={{color: 'black', left: 21, fontSize: 20, bottom: 95}}>
            Datum {'\n'}narodenia:
          </Text>
          <TextInput
            style={styles.input3}
            value={data.birthdate.split('T')[0]}
            editable={false}
            fontSize={20}></TextInput>
          <Text style={{color: 'black', left: 21, fontSize: 20, bottom: 135}}>
            Vaha:
          </Text>
          <TextInput
            style={styles.input4}
            value={data.weight}
            fontSize={20}></TextInput>
          <Text style={{color: 'black', left: 21, fontSize: 20, bottom: 165}}>
            Vyska:
          </Text>
          <TextInput
            style={styles.input5}
            value={data.weight}
            fontSize={20}></TextInput>
          <Pressable
            style={styles.button}
            android_ripple={{color: 'black'}}
            onPress={async () => getProfil()}>
            <Text style={styles.butText}>Zobraz profil</Text>
          </Pressable>
          <Pressable
            style={styles.button2}
            android_ripple={{color: 'black'}}
            onPress={async () => {
              setIsOn(false), setButt(true);
            }}>
            <Text style={styles.butText}>Dokumenty</Text>
          </Pressable>
        </View>
      ) : (
        <Files
          butt={butt}
          setButt={setButt}
          show={show}
          setShow={setShow}
          add={add}
          setAdd={setAdd}
          isOn={isOn}
          setIsOn={setIsOn}></Files>
      )}

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
    backgroundColor: 'white',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    height: 50,
    left: 35,
    width: 320,
    marginVertical: 5,
    position: 'relative',
    bottom: 60,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    left: 35,
    backgroundColor: 'red',
    height: 50,
    width: 320,
    marginVertical: 5,
    position: 'relative',
    bottom: 50,
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
    margin: 10,
    width: 250,
    left: 110,
    bottom: 40,
  },
  input2: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
    width: 250,
    left: 110,
    bottom: 100,
  },
  input3: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
    width: 250,
    left: 110,
    bottom: 150,
  },
  input4: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
    width: 250,
    left: 110,
    bottom: 180,
  },
  input5: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
    width: 250,
    left: 110,
    bottom: 210,
  },
});

export default Profil;
