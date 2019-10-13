import React, { useContext, Fragment } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import PropTypes from 'prop-types';

const Contacts = props => {
  const contactContext = useContext(ContactContext);

  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem contact={contact} />
      ))}
    </Fragment>
  );
};

Contacts.propTypes = {};

export default Contacts;
