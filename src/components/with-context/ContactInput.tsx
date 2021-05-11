// tslint:disable: linebreak-style

import { useContact } from '@store/contact';
import { observer } from 'mobx-react';
import { useRef, useState } from 'react';
import { LoadingSpinner } from '../../../public/assets/icons';

function ContactInput() {
  const { addContact } = useContact();
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
    await addContact({ name, phone, id: new Date() });
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
export default observer(ContactInput);
// export default inject(({ store }) => store.contactStore)(observer(ContactInput));
