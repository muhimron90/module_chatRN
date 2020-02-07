import React, {useState, createContext} from 'react';

export const MyContext = createContext();

export const ContextProvider = props => {
  const [store, setStore] = useState({});

  return (
    <MyContext.Provider value={[store, setStore]}>
      {props.children}
    </MyContext.Provider>
  );
};
