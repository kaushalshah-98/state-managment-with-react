// tslint:disable: linebreak-style

// import { create } from '@store/redux/contacts/effects';
import { create } from '@store/redux-toolkit/contacts/effetcs';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingSpinner } from '../../../public/assets/icons';

function ContactInput(props: any) {
  const nameInputRef: any = useRef();
  const phoneInputRef: any = useRef();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const submitForm = async (event: any) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const phone = phoneInputRef.current.value;
    if (name === '' || phone === '') {
      return;
    }
    setLoading(true);
    dispatch(create({ id: new Date(), name, phone }));
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
