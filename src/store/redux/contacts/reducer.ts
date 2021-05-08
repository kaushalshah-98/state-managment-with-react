import initialState from '../initialState';
import { Action } from './actions';
import * as types from './types';

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case types.SET_CONTACTS:
      return {
        ...state,
        contacts: [...action.payload.contacts]
      };

    case types.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((i: any) => i.id !== action.payload.contactId)
      };

    case types.CREATE_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload.contact]
      };

    default:
      return {
        ...state
      };
  }
};
export default reducer;
