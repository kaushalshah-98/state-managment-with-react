import ContactList from '@components/mobx/ContactList';
import ContactInput from '@components/mobx/ContactInput';
// import { observer } from 'mobx-react';
// import ContactList from '@components/redux/ContactList';
// import ContactInput from '@components/redux/ContactInput';

function App() {
  return (
    <div className="container mx-auto">
      <h1 className="page-title">Contacts</h1>
      <ContactInput />
      <ContactList />
    </div>
  );
}

export default App;
