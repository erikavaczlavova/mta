import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import Help from '../components/help';
import Call from '../components/call';
import TestVacc from '../components/testvacc';

const Home = props => {
  const [isOn, setIsOn] = useState(true);
  const [aaa, setAaa] = useState('     ');
  const show = props => {
    setIsOn(!isOn);
    setAaa(props);
  };
  const back = () => {
    setIsOn(true);
    setAaa('      ');
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', back);

    return () => BackHandler.removeEventListener('hardwareBackPress', back);
  }, []);
  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        <Text>{aaa}</Text>
        {isOn && (
          <View>
            <Pressable
              style={styles.button}
              android_ripple={{color: 'black'}}
              onPress={() => show(Help)}>
              <Text style={styles.butText}>Potrebujem pomoc</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              android_ripple={{color: 'black'}}
              onPress={() => show(Call)}>
              <Text style={styles.butText}>Hovor s asistentom</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              android_ripple={{color: 'black'}}
              onPress={() => show(TestVacc)}>
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
    backgroundColor: 'olive',
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
