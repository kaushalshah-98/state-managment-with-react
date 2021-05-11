import { useContext } from 'react';
import createStore from '../createStore';
import { reducer } from './reducer';
import { State } from './state';

const initialState: State = {
  contacts: [],
  loading: true
};
const { Context, Provider, Consumer } = createStore(reducer, initialState);

export { Context as AppContext, Provider as ContactProvider, Consumer };

export function useContact() {
  const [state, dispatch] = useContext(Context);
  return { state, dispatch };
}
