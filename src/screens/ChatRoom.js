import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  YellowBox,
  TextInput,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import queryString from 'query-string';
import io from 'socket.io-client';
import BackButton from './backButton';
import {MyContext} from '../Context';
import {MessageBox} from '../../component/Message';

let socket;
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
]);
YellowBox.ignoreWarnings(['Remote debugger']);

const {height} = Dimensions.get('window');
const contentHeight = height * 0.5;


const ChatRoom = location => {
  const [store, setStore] = useContext(MyContext);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [broadcast, setBroadcast] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [cH, setCH] = useState(0);

  const scrollTo = useRef(null);
  //  const ENDPOINT = `http://localhost:5000/chat?name=${name}&room=${room}`;
  const ENDPOINT = 'https://server-chat-imron.herokuapp.com/'; //'http://192.168.1.7:5000/';

  useEffect(() => {
    // socket = io(`http://localhost:5000/chat?name=${name}&room=${room}`);
    // socket.emit('join',{ name : name, room : room});
    socket = io(ENDPOINT, {
      forceNew: true,
    });
    setName(store.name);
    socket.on('connection', () => console.log('Connection'));
    socket.emit(
      'join',
      {
        name: store.name,
        room: store.room,
      },
      () => {},
    );
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('user-connected', name => {
      setBroadcast(`${name} has joined`);
      console.log(broadcast);
    });
  }, [broadcast]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
        if (messages == messages) {
          scrollTo.current.scrollToEnd();
        }
      console.log(messages);
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [messages]);

  const sendMessage = () => {
    if (message && scrollTo.current) {
      socket.emit('sendMessage', message, () => setMessage(''));
      // this.scrollView.scrollToEnd({animated: true});
     
    }
  };
  const onContentSizeChange = (contentWidth, contentHeight) => {
    setCH(contentHeight);
  }
  const scrollEnabled = cH > height;
  
  return (
    <SafeAreaView style={{flex : 1}}>
      <BackButton handleBackButton />
      <Text style={styles.title}>ChatRoom ❤️ {broadcast || 'waiting...'}</Text>
      
       
      <View style={{ flex: 1,  height : height /2 }}>
        <ScrollView
        
        scrollEventThrottle={16}
        ref={scrollTo}
         
         contentContainerStyle={styles.scrollview}
         scrollEnabled={scrollEnabled}
         onContentSizeChange={onContentSizeChange}
        // ref={view => {
        //   this.scrollView = view;
        // }}
       
        showsVerticalScrollIndicator={false}>
        <View>
         
          <View>
            {messages.map((msg, index) => (
              <View key={index}>
                {store.name != msg.name ? (
                  <MessageBox 
                    
                    userText={msg.name}
                    messageText={msg.message}
                    timeStamp={msg.timeStamp}
                    row="flex-start"
                    bgcolor="#bdc3c7"
                  />
                ) : (
                  <MessageBox
                    
                    userText="You"
                    messageText={msg.message}
                    timeStamp={msg.timeStamp}
                    row="flex-end"
                    bgcolor="#1abc9c"
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
       
      </View>
      <View style={styles.bottomTextInput}>
        <View style={[styles.flexRow, styles.shadowBg]}>
          <TextInput
            placeholder="Your Message.."
            placeholderTextColor="#3434"
            keyboardType="default"
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            maxLength={40}
            value={message}
            onChangeText={value => setMessage(value)}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              sendMessage();
            }}
          />
          <Button title="send" onPress={sendMessage} />
        </View>
      </View>
     
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: '400',
    paddingTop: 10,
  },
  bottomTextInput: {
   
       justifyContent: 'flex-end',
       backgroundColor : 'transparent',
      
       bottom : 0
  },
  scrollview: {
    flexGrow: 1,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  shadowBg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  scrollVIewStyle : {
    position : 'relative'
  },
});
export default ChatRoom;
