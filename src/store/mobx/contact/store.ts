import { services } from '@src/services';
import { action, makeObservable, observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { createContext, useContext } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined');
const { ContactService: service } = services;

class ContactStore {
  contacts: any[];
  loading: boolean;

  constructor() {
    makeObservable(this, {
      contacts: observable,
      loading: observable,
      addContact: action,
      getContacts: action,
      deleteContact: action
    });
    this.contacts = [];
    this.loading = false;
  }

  addContact = async (contact: any) => {
    try {
      this.loading = true;
      const res = await service.add(contact);
      this.contacts.push(contact);
      return res;
    } catch (err) {
      console.log('ERR :: Contact ADD Operation');
    } finally {
      this.loading = false;
    }
  };
  getContacts = async () => {
    try {
      this.loading = true;
      const res = await service.getAll();
      this.contacts = res;
      return res;
    } catch (err) {
      console.log('ERR :: Contact GET Operation');
    } finally {
      this.loading = false;
    }
  };
  deleteContact = async (contactId: number) => {
    try {
      await service.delete(contactId);
      this.contacts = this.contacts.filter((c) => c.id !== contactId);
    } catch (err) {
      console.log('ERR :: Contact DELETE Operation');
    }
  };
}

export const contactStore = new ContactStore();
export const ContactContext = createContext(contactStore);

export const useContact = () => {
  const { addContact, contacts, deleteContact, getContacts, loading } = useContext(ContactContext);
  return { addContact, contacts, deleteContact, getContacts, loading };
};

export { ContactStore };
