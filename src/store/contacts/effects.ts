import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContactService } from '@src/services/contactApi';

export const get: any = createAsyncThunk(
  `contacts/get`,
  async (obj, { dispatch, getState }) => await ContactService.getAll()
);

export const create: any = createAsyncThunk(
  `contacts/create`,
  async ({ contact }: any, { dispatch, getState }) => await ContactService.add(contact)
);

export const remove: any = createAsyncThunk(
  `contacts/delete`,
  async ({ contactId }: any, { dispatch, getState }) => await ContactService.delete(contactId)
);
