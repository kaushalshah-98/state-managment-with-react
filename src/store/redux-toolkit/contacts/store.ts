import { createSlice } from '@reduxjs/toolkit';
import { get, deleteContact, createContact } from './effetcs';
interface State {
  contacts: any[];
}
const initialState: State = {
  contacts: []
};
export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: {
    [get.fulfilled]: (state, action) => {
      state.contacts = action.payload;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.contacts = state.contacts.filter((i: any) => i.id !== action.meta.arg.contactId);
    },
    [createContact.fulfilled]: (state, action) => {
      state.contacts.push(action.payload);
    }
  }
});

export const contactReducer = contactSlice.reducer;
