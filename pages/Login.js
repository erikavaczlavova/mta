import {
  StyleSheet,
  Text,
  View,
  Pressable,
  BackHandler,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Login = props => {
  const [birthnum, setBN] = useState('');
  const [password, setPW] = useState('');
  const [login, setLogin] = useState(true);
  const [logout, setLogout] = useState(false);

  const getLogin = () => {
    return fetch(
      `http://${global.ip}:8000/user?birthnum=${birthnum}&password=${password}`,
    )
      .then(function (response) {
        if (response.status == 200) {
          showMessage({
            message: 'Uspesne prihlasenie',
            type: 'success',
          });
          setLogin(false);
          setLogout(true);
          return response.json();
        } else {
          showMessage({
            message: 'Zle prihlasovacie udaje',
            type: 'warning',
          });
          throw Error(response.status);
        }
      })
      .then(json => {
        global.userid = json.id;
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Text
          style={{
            fontSize: 45,
            color: 'white',
            backgroundColor: 'red',
            width: 400,
            height: 100,
            top: 70,
            textAlign: 'center',
          }}>
          Moje zdravie
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            top: 100,
            fontWeight: 'bold',
          }}>
          Rodne cislo:
        </Text>
        <TextInput
          style={styles.input}
          defaultValue={birthnum}
          editable={true}
          fontSize={20}
          onChangeText={value => setBN(value)}></TextInput>
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            top: 100,
            fontWeight: 'bold',
          }}>
          Heslo:
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          defaultValue={password}
          editable={true}
          fontSize={20}
          onChangeText={value => setPW(value)}></TextInput>
        <Pressable
          style={styles.button}
          android_ripple={{color: 'black'}}
          disabled={!login}
          onPress={() => {
            console.log('login');
            getLogin();
          }}>
          <Text style={styles.butText}>Prihlasit sa</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          android_ripple={{color: 'black'}}
          disabled={!logout}
          onPress={() => {
            console.log('logout');
            global.userid = 0;
            setLogin(true);
            setLogout(false);
            setBN('');
            setPW('');
          }}>
          <Text style={styles.butText}>Odhlasit sa</Text>
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
    alignItems: 'center',
    flex: 2,
    position: 'relative',
    backgroundColor: 'white',
    height: '100%',
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
    width: 250,
    top: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
    height: 50,
    width: 260,
    top: 120,
    marginVertical: 5,
  },
  butText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Login;
