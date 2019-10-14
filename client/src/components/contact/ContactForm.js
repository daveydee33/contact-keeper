import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact } = contactContext;

  const defaultFormValues = {
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  };

  const [contact, setContact] = useState(defaultFormValues);

  const { name, email, phone, type } = contact;

  const onChange = e => {
    console.log(e.target.name);
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addContact(contact);
    setContact(defaultFormValues);
  };

  return (
    <form onChange={onChange} onSubmit={onSubmit}>
      <h2 className="text-primary">Add Contact</h2>
      <input type="text" name="name" placeholder="Name" value={name} />
      <input type="email" name="email" placeholder="Email" value={email} />
      <input type="text" name="phone" placeholder="Phone" value={phone} />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
      />{' '}
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
      />{' '}
      Professional{' '}
      <div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
