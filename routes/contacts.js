const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route     GET api/contacts
// @desc      Get all user's contacts
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      data: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route     POST api/contacts
// @desc      Add a new contact
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required')
    ]
  ],
  async (req, res) => {
    // check for errors and return them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      // I could check for a duplicate record here - but I don't think we should care

      // create new contact record
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error('Error saving new contact');
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/contacts/:id
// @desc      Update a contact
// @access    Private
router.put('/:id', auth, (req, res) => {
  res.send('Update a contact');
});

// @route     DELETE api/contacts/:id
// @desc      Delete a contact
// @access    Private
router.delete('/:id', auth, (req, res) => {
  res.send('Delete a contact');
});

module.exports = router;
