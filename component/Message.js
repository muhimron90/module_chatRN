import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

export const MessageBox = props => {
  const [random, setRandom] = useState('');

  return (
    <View style={styles.container}>
   
      <View style={[styles.row, {justifyContent: props.row}]}>
        <View style={[styles.box, {backgroundColor: props.bgcolor}]}>
          <View style={styles.row}>
            <Text style={styles.textUser}>{props.userText}</Text>
            <Text style={styles.dateTime}>{props.timeStamp}</Text>
          </View>
          <Text style={styles.textMessage}>{props.messageText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
    
  },
  box: {
    flex: 0,

    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textUser: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    color: '#34495e',
  },
  coloumn: {
    minHeight: '100%',
    flexDirection: 'column-reverse',
  },
  textMessage: {
    fontSize: 12,
    fontWeight: '400',
    padding: 5,
  },
  dateTime: {
    fontSize: 10,

    padding: 5,

    color: '#555',

    textAlign: 'center',
  },
});
