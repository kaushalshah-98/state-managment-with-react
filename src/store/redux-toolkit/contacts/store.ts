import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: []
  },
  reducers: {
    setContacts: (state: any, { payload }: any) => {
      state.contacts = payload;
    },
    createContact: (state: any, { payload }: any) => {
      state.contacts.push(payload);
    },
    deleteContact: (state, { payload }) => {
      state.contacts = state.contacts.filter((c: any) => c.id !== payload);
    }
  }
});

export const contactReducer = contactSlice.reducer;
export const { setContacts, deleteContact, createContact } = contactSlice.actions;
