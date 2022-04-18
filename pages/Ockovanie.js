import {StyleSheet, Text, View, Pressable, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Ockovanie = props => {
  const [data, setData] = useState([]);
  const [dataPass, setDataPass] = useState([]);

  const setInfo = () => {
    console.log(dataPass);
  };

  const getVacc = () => {
    return fetch(`http://192.168.0.108:8000/vaccine?user_id=${global.userid}`)
      .then(response => response.json())
      .then(json => {
        setData(json.items);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getPass = () => {
    return fetch(`http://192.168.0.108:8000/passport?user_id=${global.userid}`)
      .then(response => response.json())
      .then(json => {
        setDose(json.items[json.items.length - 1].dose);
        setDate(
          json.items[json.items.length - 1].date.toString().split('T')[0],
        );
        setName(json.items[json.items.length - 1].name);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const [pas, setPas] = useState(false);
  const [date, setDate] = useState('');
  const [dose, setDose] = useState('');
  const [name, setName] = useState('');

  function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        {!pas ? (
          <FlatList
            data={data}
            keyExtractor={({id}) => id.toString()}
            renderItem={({item}) => (
              <Pressable style={styles.button}>
                <Text style={styles.butText}>
                  {'  '}
                  {item.date.toString().split('T')[0]}
                  {'  '} {item.dose} {'  '} {item.name}
                </Text>
              </Pressable>
            )}
          />
        ) : (
          <View style={{alignItems: 'center', alignContent: 'center'}}>
            <Image
              source={require('../assets/qr.png')}
              style={{
                width: 150,
                height: 200,
              }}
            />
            <Pressable style={styles.button}>
              <Text style={styles.result}>
                {date} {'   '}
                {dose} {'   '}
                {name}
              </Text>
            </Pressable>
          </View>
        )}
        <Pressable
          style={styles.button2}
          android_ripple={{color: 'black'}}
          onPress={() => {
            if (global.userid != 0) {
              getPass();
              setPas(true);
            } else {
              showMessage({
                message: 'Uzivatel nie je prihlaseny',
                type: 'warning',
              });
            }
          }}>
          <Text style={styles.butText2}>GET Pas</Text>
        </Pressable>
        <Pressable
          style={styles.button3}
          android_ripple={{color: 'black'}}
          onPress={() => {
            if (global.userid != 0) {
              getVacc();
              setPas(false);
            } else {
              showMessage({
                message: 'Uzivatel nie je prihlaseny',
                type: 'warning',
              });
            }
          }}>
          <Text style={styles.butText2}>GET VACC</Text>
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
    justifyContent: 'center',
    height: 50,
    width: 320,
    backgroundColor: 'tomato',
    borderRadius: 10,
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
    position: 'absolute',
    top: 500,
  },
  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 50,
    backgroundColor: 'red',
    height: 50,
    width: 320,
    marginVertical: 5,
    position: 'absolute',
    top: 570,
  },
  butText: {
    color: 'black',
    fontSize: 15,
  },
  butText2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  result: {
    justifyContent: 'center',
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Ockovanie;
