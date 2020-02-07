import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import ChatRoom from './ChatRoom';
import {MyContext} from '../Context';

function Login({navigation: {navigate}}) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState(false);

  const [store, setStore] = useContext(MyContext);

  useEffect(() => {
    return () => {
      onClear();
      console.log('cleaned up');
    };
  }, []);

  const getAction = () => {
    const promise = new Promise((resolve, reject) => {
      if (name !== '') {
        setLoading(true);
        resolve('OKay');
      } else {
        alert('oops Isi dulu Boss');
        onClear();
        //reject(Error('broken'));
      }
    });
    try {
      let data = {
        id: '',
        name: name,
        room: room,
        uri: `/chat?name=${name}&room=${room}`,
      };

      setTimeout(() => {
        promise
          .then(() => {
            setStore(data);
          })
          .then(() => {
            navigate('chat');
            console.log(data);
          });
      }, 500);
    } catch (error) {
      onClear();
      console.log(error);
    }
  };

  function onClear() {
    setName('');
    setRoom('');
    setLoading(false);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView behavior="padding" enabled>
        {/* <Text>Fill Data</Text> */}

        <View>
          <View style={{padding: 15}}>
            <Text>Name :</Text>
            <TextInput
              placeholder="Your Name.."
              placeholderTextColor="#3434"
              style={styles.textInput}
              keyboardType="default"
              maxLength={6}
              autoCapitalize="sentences"
              autoCompleteType="off"
              autoCorrect={false}
              value={name}
              onChangeText={value => setName(value)}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                getAction()
              }}
            />
          </View>
          {/* <View style={{padding: 15}}>
            <Text>Room Name :</Text>
            <TextInput
              ref={nextStep => {
                this.nextStep = nextStep;
              }}
              style={styles.textInput}
              placeholder="Room Name.."
              placeholderTextColor="#3434"
              keyboardType="default"
              maxLength={25}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={room}
              onChangeText={value => setRoom(value)}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.nextStep.focus();
              }}
            />
          </View> */}
          {loading === true ? (
            <ActivityIndicator size="large" color="#672" />
          ) : (
            <Button
              title="Submit"
              onPress={getAction}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
export default Login;
// this.props.navigation.navigate('chat')
