import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter } = contactContext;

  const onChange = e => {
    const filterText = e.target.value;
    if (filterText) {
      filterContacts(filterText);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input type="text" placeholder="Filter Contacts..." onChange={onChange} />
    </form>
  );
};

export default ContactFilter;
