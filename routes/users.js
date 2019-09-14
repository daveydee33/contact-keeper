const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    res.send('all good');
    // res.send(req.body);
  }
);

// router.post(
//   '/',

//   (req, res) => {
//     console.log('called it');
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     res.send('all good');
//     // res.send(req.body);
//   }
// );

module.exports = router;
