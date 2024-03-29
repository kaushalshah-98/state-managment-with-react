// tslint:disable: linebreak-style

import { useContact } from '@store/contact';
import { useRef, useState } from 'react';
import { LoadingSpinner } from '../../public/assets/icons';
import { ContactService } from '@src/services/contactApi';

function ContactInput() {
  const { dispatch } = useContact();
  const nameInputRef: any = useRef();
  const phoneInputRef: any = useRef();
  const [loading, setLoading] = useState(false);

  const submitForm = async (event: any) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const phone = phoneInputRef.current.value;
    if (name === '' || phone === '') {
      return;
    }
    setLoading(true);
    const id = Math.random().toString(36).substring(7);
    console.log(id);
    await ContactService.add({ name, phone, id });
    dispatch({ type: 'CREATE', payload: { name, phone, id } });
    nameInputRef.current.value = '';
    phoneInputRef.current.value = '';
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div className="contact-form">
          <div className="input-group">
            <input
              type="text"
              className="rounded-l-lg contact-input"
              placeholder="name"
              ref={nameInputRef}
              disabled={loading}
            />
            <input
              type="text"
              className="rounded-r-lg contact-input"
              placeholder="phone"
              ref={phoneInputRef}
              disabled={loading}
            />
          </div>
          <button type="submit" className="add-button" disabled={loading}>
            {loading && <LoadingSpinner className="spinner" />}
            {loading ? 'Adding' : 'Add'}
          </button>
        </div>
      </form>
    </>
  );
}
export default ContactInput;
// export default inject(({ store }) => store.contactStore)(observer(ContactInput));
