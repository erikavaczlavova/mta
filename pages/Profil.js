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
import {showMessage, hideMessage} from 'react-native-flash-message';
import Files from '../components/files';

const Profil = props => {
  const [isOn, setIsOn] = useState(true);
  const [butt, setButt] = useState(false);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [editnum, setNum] = useState('');
  const [editwe, setWe] = useState('');
  const [edithe, setHe] = useState('');
  const [data, setData] = useState({
    birthdate: '',
    birthnum: '',
    height: '',
    id: 1,
    name: '',
    password: '1111',
    weight: '',
  });

  const getProfil = () => {
    setIsOn(true);
    return fetch(`http://192.168.0.108:8000/user?id=${global.userid}`)
      .then(response => response.json())
      .then(json => {
        setData(json);
        if (json.weight != null) setWe(json.weight);
        else {
          setWe('');
        }
        if (json.height != null) setWe(json.height);
        else {
          setHe('');
        }
        setNum(json.birthnum);

        setHe(json.height);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const back = () => {
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
            defaultValue={data.birthnum}
            onChangeText={value => {
              setNum(value);
            }}
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
            defaultValue={data.weight.toString()}
            onChangeText={value => {
              setWe(value);
            }}
            fontSize={20}></TextInput>
          <Text style={{color: 'black', left: 21, fontSize: 20, bottom: 165}}>
            Vyska:
          </Text>
          <TextInput
            style={styles.input5}
            defaultValue={data.height.toString()}
            onChangeText={value => {
              setHe(value);
            }}
            fontSize={20}></TextInput>
          <Pressable
            style={styles.button3}
            android_ripple={{color: 'black'}}
            onPress={async () => {
              if (global.userid != 0) {
                if (
                  edithe > 0 &&
                  editwe > 0 &&
                  editnum.length == 9 &&
                  editnum[4] == '/' &&
                  (parseInt(editnum.substring(0, 4)).toString().length == 4 ||
                    parseInt(editnum.substring(0, 4)) == 0) &&
                  (parseInt(editnum.substring(5, 9)).toString().length == 4 ||
                    parseInt(editnum.substring(5, 9)) == 0)
                ) {
                  showMessage({
                    message: 'Zmeny ulozene',
                    type: 'success',
                  });
                  let body = {
                    birthdate: data.birthdate,
                    birthnum: editnum,
                    height: edithe,
                    id: data.id,
                    password: data.password,
                    weight: editwe,
                  };
                  return await fetch('http://192.168.0.108:8000/user', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  });
                } else {
                  showMessage({
                    message: 'Zly format',
                    description: 'Rodne cislo: 0000/0000, Vyska/Vaha: cislo',
                    type: 'warning',
                  });
                }
              } else {
                showMessage({
                  message: 'Uzivatel nie je prihlaseny',
                  type: 'warning',
                });
              }
            }}>
            <Text style={styles.butText}>Ulozit zmeny</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            android_ripple={{color: 'black'}}
            onPress={async () => {
              if (global.userid != 0) getProfil();
              else {
                showMessage({
                  message: 'Uzivatel nie je prihlaseny',
                  type: 'warning',
                });
              }
            }}>
            <Text style={styles.butText}>Zobraz profil</Text>
          </Pressable>
          <Pressable
            style={styles.button2}
            android_ripple={{color: 'black'}}
            onPress={async () => {
              if (global.userid != 0) setIsOn(false), setButt(true);
              else {
                showMessage({
                  message: 'Uzivatel nie je prihlaseny',
                  type: 'warning',
                });
              }
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
    bottom: 80,
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
    bottom: 80,
  },
  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    left: 220,
    backgroundColor: 'red',
    height: 40,
    width: 150,
    marginVertical: 5,
    position: 'relative',
    bottom: 210,
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
