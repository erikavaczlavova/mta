import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {StatusBar} from 'expo-status-bar';
import DocumentPicker from 'react-native-document-picker';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Files = props => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [newtitle, setNTitle] = useState('');
  const getFiles = () => {
    return fetch(`http://192.168.0.108:8000/file?user_id=${global.userid}`)
      .then(response => response.json())
      .then(json => {
        console.log(json.items);
        setData(json.items);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const putFile = async () => {
    const upload = new FormData();
    upload.append('title', newtitle);
    upload.append('user_id', global.userid);
    upload.append('file', fileResponse[0]);
    return await fetch('http://192.168.0.108:8000/file', {
      method: 'POST',
      body: upload,
    });
  };

  return (
    <View style={styles.homeBody}>
      <View style={styles.body}>
        {props.show && (
          <View>
            <Image
              source={{
                uri: `http://192.168.0.108:8000/file?user_id=${global.userid}&title=${title}`,
              }}
              style={{
                width: 325,
                height: 250,
                alignSelf: 'center',
              }}
            />
            <FlatList
              data={data}
              keyExtractor={({id}) => id.toString()}
              renderItem={({item}) => (
                <Pressable
                  style={styles.button}
                  android_ripple={{color: 'black'}}
                  onPress={() => {
                    setTitle(item.title);
                  }}>
                  <Text style={styles.butText}>
                    {'  '}
                    {item.title}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        )}
        {props.add && (
          <View>
            <Pressable
              style={styles.button}
              android_ripple={{color: 'black'}}
              onPress={handleDocumentSelection}>
              <Text style={{color: 'black'}}>Browse</Text>
            </Pressable>

            <Text
              style={{
                color: 'black',
                fontSize: 22,
                top: 15,
                bottom: 10,
              }}>
              Title:
            </Text>
            <TextInput
              style={styles.input}
              defaultValue="Your title"
              fontSize={20}
              onChangeText={value => {
                setNTitle(value);
              }}></TextInput>

            <Pressable
              style={styles.button}
              android_ripple={{color: 'black'}}
              onPress={() => {
                putFile();
                showMessage({
                  message: 'Nahranie uspesne',
                  type: 'success',
                });
              }}>
              <Text style={styles.butText}>ADD</Text>
            </Pressable>
          </View>
        )}
        {props.butt && (
          <View style={styles.body}>
            <Pressable
              style={styles.button2}
              android_ripple={{color: 'black'}}
              onPress={() => {
                getFiles(), props.setShow(true), props.setButt(false);
              }}>
              <Text style={styles.butText}>GET Files</Text>
            </Pressable>
            <Pressable
              style={styles.button3}
              android_ripple={{color: 'black'}}
              onPress={() => {
                props.setAdd(true), props.setButt(false);
              }}>
              <Text style={styles.butText}>ADD doc</Text>
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
    left: 45,
    bottom: 30,
  },
});

export default Files;
