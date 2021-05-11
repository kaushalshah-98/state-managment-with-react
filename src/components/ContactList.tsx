import { ContactService } from '@src/services/contactApi';
import { useContact } from '@store/contact';
import { useEffect } from 'react';
import { DeleteIcon, PhoneIcon, UserIcon } from '../../public/assets/icons';

function ContactList() {
  const { state, dispatch } = useContact();
  const { contacts, loading } = state;

  useEffect(() => {
    get();
  }, []);

  const removeContact = async (id: string) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    await ContactService.delete(id);
    dispatch({ type: 'DELETE', payload: id });
  };

  const get = async () => {
    const res = await ContactService.getAll();
    console.log('res', res);
    dispatch({ type: 'SET', payload: res });
  };

  return (
    <div className="contacts-wrapper">
      {contacts?.length > 0 ? (
        contacts.map((contact: any) => (
          <div key={contact.id} className="contact-card group ">
            <img
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt="headshot"
              className="contact-image"
            />
            <div className="relative w-full p-2">
              <button className="delete-button" onClick={() => removeContact(contact.id)}>
                <DeleteIcon className="" />
              </button>

              <div className="flex items-center">
                <UserIcon className="mr-2" />
                <p className="name">{contact.name}</p>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="mr-2" />
                <p className="phone">{contact.phone}</p>
              </div>
            </div>
          </div>
        ))
      ) : contacts ? (
        <p>You have no contacts yet</p>
      ) : loading ? (
        <p>Loading..</p>
      ) : null}
    </div>
  );
}
// export default ContactList;
export default ContactList;
