import React from 'react';

import Router from './Router';
import {ContextProvider} from '../src/Context';
function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}
export default App;
