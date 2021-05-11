import ContactList from '@components/with-hoc/ContactList';
import ContactInput from '@components/with-hoc/ContactInput';

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
