import React, { useReducer } from 'react';
import uuid from 'uuid/v4'; // will use for hardcoded data before integrate with backend

import contactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT
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
        type: 'personal'
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
    ],
    current: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add Contact
  const addContact = contact => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contacts
  // Clear Filter

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
