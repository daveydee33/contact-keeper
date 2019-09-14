const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  '/',
  [
    check('name')
      .not()
      .isEmpty()
      .withMessage('Name is required'),
    check('email').isEmail(),
    check('password')
      .isLength({ min: 4 })
      .withMessage('password must be at least 4 characters')
  ],
  async (req, res) => {
    // check for errors and return them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // no validation errors - so check if email exists
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // If user already exists...
      if (user) {
        return res
          .status(400)
          .json({ msg: 'User already exists with that email' });
      }

      // Otherwise, create the new user
      user = new User({
        name,
        email,
        password
      });

      // And hash the plain-text password, before we save it.
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // then save the user to the db
      await user.save();
      console.log('New user created and saved to db:\n', user);

      // then return a JWT token containing the UserID
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: '7 days'
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Error when finding or creating the user');
      console.error(err);
      return res
        .status(500)
        .send('There was a server error - check the server logs');
    }
  }
);

module.exports = router;
