const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
const mongoose = require('mongoose');

// @route     GET api/contacts
// @desc      Get all user's contacts
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route     POST api/contacts
// @desc      Create a new contact
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
      check('type')
        .isIn(['personal', 'professional'])
        .withMessage('Type must be "personal" or "professional"')
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
/* TODO:  I would probably refactor this a lot.  
- The 404 doesn't work.  
- I wouldn't use 'let contact' and re-assign it.  I would return a different variable name - so we know it's the new record, and not the original record.  eg.  updatedContact'.  
- Also, I would put the same field validation here as we did in the create new contact route.  eg, add verification that name is not empty, and type is only 'personal' or 'professional'
- Brad didn't know what the 'new: true' option actually does.
- Some of Brad's HTTP codes are not exactly correct.
- I don't know if this will work we want to change a value to empty.  
  - eg, If we have name: "Name", and we want to clear it, the PUT contents would have name: "", but it doesn't seem to clear it by setting with empty string.  It looks like it just ignores it.  Might be a #BUG that we need to fix later.
*/
router.put('/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    // TODO: Fix this - because it's never being called in the PUT or DELETE -- it goes straight to the catch/500
    if (!contact) return res.status(404).json({ msg: 'Contact not found' }); // looks like this doesn't get called-- the catch-error is called instead.

    // Make sure logged in user making request (from x-auth-token header) owns contact
    if (contact.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: 'You dont have authorization to edit this record' });

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true } // tells mongoose to return the new/updated version of the record, instead of the previous
    );

    res.json(contact);
  } catch (err) {
    console.error('Error updating contact');
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete a contact
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   console.error('not a valid id format.');
    //   return res.json({ msg: 'This ID is not a valid ObjectID format' });
    // }

    const contact = await Contact.findById(req.params.id);

    // TODO: Fix this - because it's never being called in the PUT or DELETE -- it goes straight to the catch/500
    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error('Error deleting by ID.');
    console.error('The ID may not be mongoose ObjectID format');
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
