const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  '/',
  [
    check('email').isEmail(),
    check('password')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // check for errors and return them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'User does not exist' }); // we should probably make this more generic
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials.' });
      }

      //  return a JWT token containing the UserID
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
    } catch (error) {
      console.log('Error when trying to authenticate the user');
      console.log(err);
      return res
        .status(500)
        .send('There was a server error - check the server logs');
    }
  }
);

module.exports = router;
