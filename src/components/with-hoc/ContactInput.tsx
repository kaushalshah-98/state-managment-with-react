import { create } from '@store/contacts/effects';
import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { LoadingSpinner } from '../../../public/assets/icons';

function ContactInput(props: any) {
  const nameInputRef: any = useRef();
  const phoneInputRef: any = useRef();

  const [loading, setLoading] = useState(false);
  const { createIt } = props;
  const submitForm = async (event: any) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const phone = phoneInputRef.current.value;
    if (name === '' || phone === '') {
      return;
    }
    setLoading(true);
    createIt({ id: new Date(), name, phone });
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

// version 1
const mapDispatchToProps = (dispatch: any) => ({
  createIt: (event: any) => dispatch(create(event)) // <-- manually dispatches
});

// version 2
// function mapDispatchToProps(dispatch: any) {
//   return {
//     createIt: bindActionCreators(create, dispatch)
//   };
// }

// version 3
// const mapDispatchToProps = {
//   createIt: create // <-- yay: auto dispatches
// };
export default connect(null, mapDispatchToProps)(ContactInput);
