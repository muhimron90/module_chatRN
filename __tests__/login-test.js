import React from 'react';
// import 'react-native';
import Login from '../src/screens/Login';

import renderer from 'react-test-renderer';
// globals.DEV = true;
it('render correctly', () => {
  renderer.create(<Login />);
});
