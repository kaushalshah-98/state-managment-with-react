import { Action } from './action';
import { State } from './state';

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        loading: false,
        contacts: [...action.payload]
      };

    case 'DELETE':
      return {
        ...state,
        contacts: state.contacts.filter((i: any) => i.id !== action.payload)
      };

    case 'CREATE':
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };

    default:
      return {
        ...state
      };
  }
};
