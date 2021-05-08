export type Action =
  | { type: 'DELETE_CONTACT'; payload: { contactId: number } }
  | { type: 'CREATE_CONTACT'; payload: { contact: any } }
  | { type: 'GET_CONTACTS' }
  | { type: 'SET_CONTACTS'; payload: { contacts: any[] } };

export function deleteContact(contactId: number) {
  return { type: 'DELETE_CONTACT', payload: { contactId } };
}

export function createContact(contact: any) {
  return { type: 'CREATE_CONTACT', payload: { contact } };
}

export function getContacts() {
  return { type: 'GET_CONTACTS' };
}

export function setContacts(contacts: any[]) {
  return { type: 'SET_CONTACTS', payload: { contacts } };
}
