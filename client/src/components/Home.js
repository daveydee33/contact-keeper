import React, { useContext, useEffect } from 'react';
import Contacts from './contact/Contacts';
import ContactForm from './contact/ContactForm';
import ContactFilter from './contact/ContactFilter';
import AuthContext from '../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();

    // console warning: React Hook useEffect has a missing dependency: 'authContext'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
