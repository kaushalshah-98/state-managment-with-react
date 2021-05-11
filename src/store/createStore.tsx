import React, { createContext, FC, useContext } from 'react';

const createStore = (store: any) => {
  const Context = createContext(store);

  const Provider: FC = (props: any) => {
    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };
  const useStore = () => {
    return useContext(Context);
  };
  return { Context, Provider, useStore, Consumer: Context.Consumer };
};

export default createStore;
