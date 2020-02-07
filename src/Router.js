import * as React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './screens/Login';
import ChatRoom from './screens/ChatRoom';
const WelcomeStack = createStackNavigator(
  {
    initApp: {
      screen: Login,
      navigationOptions: {
        title: null,
        headerStyle: {
          backgroundColor: '#5a8b96',
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          height: 75,
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: '600',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
          backgroundColor: 'transparent',
        },
      },
    },
  },
  {
    initialRouteName: 'initApp',
  },
);

const chatRoom = createStackNavigator({
  menuChat: {
    screen: ChatRoom,
    navigationOptions: {
      title: 'Lets Chat',
      headerStyle: {
        backgroundColor: '#5a8b96',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        height: 75,
      },
      headerTitleStyle: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        backgroundColor: 'transparent',
      },
    },
  },
});

const MyRouter = createSwitchNavigator(
  {
    initPage: WelcomeStack,
    chat: chatRoom,
  },
  {
    initialRouteName: 'initPage',
  },
);

const Router = createAppContainer(MyRouter);
export default Router;
