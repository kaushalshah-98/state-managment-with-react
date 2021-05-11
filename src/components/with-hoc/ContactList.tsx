import { get, remove } from '@store/contacts/effects';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DeleteIcon, PhoneIcon, UserIcon } from '../../../public/assets/icons';

function ContactList(props: any) {
  const { contacts, getAll, removeIt } = props;
  const removeContact = async (id: number) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    removeIt(id);
  };

  useEffect(() => {
    getAll();
  }, []);

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
      ) : false ? (
        <p>Loading..</p>
      ) : null}
    </div>
  );
}

function mapStateToProps(state: any) {
  return { contacts: state.contactReducer.contacts };
}
function mapDispatchToProps(dispatch: any) {
  return {
    getAll: bindActionCreators(get, dispatch),
    removeIt: bindActionCreators(remove, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
