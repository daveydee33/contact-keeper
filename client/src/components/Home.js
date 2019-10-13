import React from 'react';
import PropTypes from 'prop-types';
import Contacts from './contact/Contacts';

const Home = props => {
  return (
    <div className="grid-2">
      <div>ContactForm...</div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
