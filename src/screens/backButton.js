import React, {useEffect} from 'react';
import {BackHandler, Alert} from 'react-native';
import {withNavigation} from 'react-navigation';

const BackButton = props => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [handleBackButton]);

  const handleBackButton = async () => {
    if (!props.navigation.isFocused()) {
      return false;
    } else {
      Alert.alert(
        'Hey, wait a sec !!',
        'Are you sure want close this Apps?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'GoodBye',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        },
      );
      return true;
    }
  };
  return props.handleBackButton;
};

export default withNavigation(BackButton);
