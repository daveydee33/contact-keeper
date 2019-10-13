import React, { useReducer } from 'react';
import uuid from 'uuid/v4'; // will use for hardcoded data before integrate with backend

import contactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT
  // DELETE_CONTACT,
  // SET_CURRENT,
  // CLEAR_CURRENT,
  // UPDATE_CONTACT,
  // FILTER_CONTACTS,
  // CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'AAA',
        email: 'aaa@aaa.com',
        phone: '111-111-1111',
        type: 'professional'
      },
      {
        id: 2,
        name: 'BBB',
        email: 'bbb@bbb.com',
        phone: '222-222-2222',
        type: 'other'
      },
      {
        id: 3,
        name: 'CCC',
        email: 'ccc@ccc.com',
        phone: '333-333-3333',
        type: 'professional'
      },
      {
        id: 4,
        name: 'CCC',
        phone: '333-333-3333',
        type: 'professional'
      },
      {
        id: 5,
        name: 'CCC',
        email: 'ccc@ccc.com',
        type: 'professional'
      },
      {
        id: 6,
        name: 'CCC',
        type: 'professional'
      }
    ]
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = contact => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  // Set Current Contact
  // Clear Current Contact
  // Update Contact
  // Filter Contacts
  // Clear Filter

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        addContact
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
