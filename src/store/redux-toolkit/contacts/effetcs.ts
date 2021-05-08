import { ContactService } from '@src/services/contactApi';
import { setContacts, createContact, deleteContact } from './store';

export const get = () => {
  return async (dispatch: any) => {
    try {
      const res = await ContactService.getAll();
      dispatch(setContacts(res));
    } catch (error) {
      console.log('ERR :: Contact GET Operation');
    }
  };
};
export const create = (contact: any) => {
  return async (dispatch: any) => {
    try {
      await ContactService.add(contact);
      dispatch(createContact(contact));
    } catch (error) {
      console.log('ERR :: Contact ADD Operation');
    }
  };
};
export const remove = (courseId: number) => {
  return async (dispatch: any) => {
    try {
      await ContactService.delete(courseId);
      dispatch(deleteContact(courseId));
    } catch (error) {
      console.log('ERR :: Contact DELETE Operation');
    }
  };
};

// Usage in component as hooks
// const state = useSelector((state: any) => state.contactReducer);
// state.contacts

// const dispatch = useDipatch();
// dispatch(create(remove(id)))
