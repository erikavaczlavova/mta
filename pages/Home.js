import {StyleSheet, Text, View, Pressable, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import Help from '../components/help';
import Call from '../components/call';
import TestVacc from '../components/testvacc';

const Home = props => {
  const [isOn, setIsOn] = useState(true);
  const [aaa, setAaa] = useState('     ');
  const [help, setHelp] = useState(false);
  const [helpButtons, setHB] = useState(false);
  const [call, setCall] = useState(false);
  const [testvacc, setTV] = useState(false);

  const back = () => {
    console.log(isOn, help, helpButtons);
    if (!isOn && help) {
      setIsOn(true);
      setHelp(false);
      setAaa('      ');
    } else if (helpButtons) {
      setHelp(true);
      setHB(false);
      setAaa('      ');
    } else if (call) {
      setIsOn(true);
      setCall(false);
      setAaa('      ');
    } else if (testvacc) {
      setIsOn(true);
      setTV(false);
      setAaa('      ');
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', back);

    return () => BackHandler.removeEventListener('hardwareBackPress', back);
  }, [isOn, help, helpButtons, call, testvacc]);
  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Text style={{color: 'black'}}>{aaa}</Text>
        {help && (
          <Help
            aaa={aaa}
            setAaa={setAaa}
            help={help}
            setHelp={setHelp}
            helpButtons={helpButtons}
            setHB={setHB}></Help>
        )}
        {call && <Call></Call>}
        {testvacc && <TestVacc></TestVacc>}
        {isOn && (
          <View>
            <Pressable
              style={styles.button}
              android_ripple={{color: 'black'}}
              onPress={() => {
                setIsOn(false);
                setHelp(true);
              }}>
              <Text style={styles.butText}>Potrebujem pomoc</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              android_ripple={{color: 'black'}}
              onPress={() => {
                setIsOn(false);
                setCall(true);
              }}>
              <Text style={styles.butText}>Hovor s asistentom</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              android_ripple={{color: 'black'}}
              onPress={() => {
                setIsOn(false);
                setTV(true);
              }}>
              <Text style={styles.butText}>Termin/Test</Text>
            </Pressable>
          </View>
        )}
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 50,
    backgroundColor: 'red',
    height: 100,
    width: 200,
    marginVertical: 50,
  },
  butText: {
    color: 'white',
    fontSize: 25,
  },
});

export default Home;
