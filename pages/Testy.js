import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import EditTest from '../components/edittest';

const Testy = props => {
  const [isOn, setIsOn] = useState(true);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editLoc, setEL] = useState('init');
  const [editType, setType] = useState('init');
  const [editID, setID] = useState('');
  const [date, setDate] = useState('');

  const getPCR = () => {
    return fetch('http://192.168.0.87:8000/test?user_id=9&type=PCR')
      .then(response => response.json())
      .then(json => {
        setData(json.items);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getAG = () => {
    return fetch('http://192.168.0.87:8000/test?user_id=9&type=AG')
      .then(response => response.json())
      .then(json => {
        setData(json.items);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const Res = props => {
    return (
      <View>
        {props.result == null ? (
          <Text style={styles.result}>Result: None</Text>
        ) : props.result ? (
          <Text style={styles.result}>Result: Positive</Text>
        ) : (
          <Text style={styles.result}>Result: Negative</Text>
        )}
      </View>
    );
  };

  const back = () => {
    console.log(isOn);
    if (edit) {
      setIsOn(true);
      setEdit(false);
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', back);

    return () => BackHandler.removeEventListener('hardwareBackPress', back);
  }, [isOn]);

  return (
    <View style={styles.homeBody}>
      {edit && (
        <EditTest
          editType={editType}
          setType={setType}
          editLoc={editLoc}
          setEL={setEL}
          editID={editID}
          date={date}></EditTest>
      )}
      {isOn && (
        <View style={styles.body}>
          <FlatList
            data={data}
            keyExtractor={({id}) => id.toString()}
            renderItem={({item}) => (
              <Pressable
                style={styles.button}
                android_ripple={{color: 'black'}}
                onPress={() => {
                  if (item.result == null) {
                    setIsOn(false);
                    setEdit(true);
                    setType(item.type);
                    setEL(item.location);
                    setID(item.id);

                    setDate(item.date.toString().split('T')[0]);
                  } else {
                    console.log('no result');
                  }
                }}>
                <Text style={styles.butText}>
                  {'  '}
                  {item.date.toString().split('T')[0]}
                  {'      '} {item.location}
                  {'  '} {item.type} {'  '}
                  <Res result={item.result}></Res>
                </Text>
              </Pressable>
            )}
          />
          <Pressable
            style={styles.button2}
            android_ripple={{color: 'black'}}
            onPress={() => getPCR()}>
            <Text style={styles.butText2}>GET PCR TESTS</Text>
          </Pressable>
          <Pressable
            style={styles.button2}
            android_ripple={{color: 'black'}}
            onPress={() => getAG()}>
            <Text style={styles.butText2}>GET AG TESTS</Text>
          </Pressable>
        </View>
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
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: '100%',
  },
  button: {
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 50,
    backgroundColor: 'tomato',
    height: 50,
    width: 320,
    marginVertical: 5,
    flexDirection: 'row',
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 50,
    backgroundColor: 'red',
    height: 50,
    width: 320,
    marginVertical: 5,
  },
  butText: {
    color: 'white',
    fontSize: 15,
  },
  butText2: {
    color: 'white',
    fontSize: 20,
  },
  result: {
    justifyContent: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export {Testy};
