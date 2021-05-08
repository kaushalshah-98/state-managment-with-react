import { ContactService } from '@src/services/contactApi';
import { call, put } from 'redux-saga/effects';
import { createContact, deleteContact, setContacts } from './actions';

export function* get(): any {
  try {
    const res = yield call(ContactService.getAll);
    yield put(setContacts(res));
    return res;
  } catch (error) {
    console.log('ERR :: Contact GET Operation');
  }
}
export function* create(contact: any): any {
  try {
    yield call(ContactService.add, contact);
    yield put(createContact(contact));
  } catch (error) {
    console.log('ERR :: Contact ADD Operation');
  }
}
export function* remove(courseId: any): any {
  try {
    yield call(ContactService.delete, courseId);
    yield put(deleteContact(courseId));
  } catch (error) {
    console.log('ERR :: Contact DELETE Operation');
  }
}
