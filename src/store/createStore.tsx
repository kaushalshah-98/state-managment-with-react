import React, { createContext, Dispatch, FC, Reducer, useReducer } from 'react';

const createStore = <S extends {}, A extends {}>(reducer: Reducer<S, A>, initialState: S) => {
  // tslint:disable-next-line: no-empty
  const contextValues: [S, Dispatch<A>] = [initialState, (action) => {}];

  const Context = createContext<[S, Dispatch<A>]>(contextValues);

  const Provider: FC = (props: any) => {
    const store = useReducer(reducer, initialState);
    return <Context.Provider value={store}>{props.children}</Context.Provider>;
  };

  return { Context, Provider, Consumer: Context.Consumer };
};

export default createStore;
