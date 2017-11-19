'use strict'

const express = require('express');
const router = express.Router();

const User = require('../models/user');

let authenticateCall = (req, res, next) => {
  if (process.env.MITMAN_TOKEN == req.get('mitman-token')) {
    return next();
  }
  res.status(401).json({
    success: false,
    msg: 'Unauthorized request',
  })
}

router.get('/', authenticateCall, (req, res) => {
  res.status(200).send('User');
});

router.post('/', authenticateCall, (req, res) => {
  let newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    fb_id: req.body.fb_id,
    email: req.body.email,
    phone_number: req.body.phone_number,
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        msg: 'Error adding user',
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      msg: 'Successfully added user data',
      user: user,
    });
  });
});

router.get('/:fbid', authenticateCall, (req, res) => {
  let fbId = req.params.fbid;
  User.getUserByFbId(fbId, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        msg: 'Error getting user data',
        err: err,
      });
    };
    if (!err && !user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found',
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      msg: 'Successfully obtained user data',
      user: user,
    });
  })
})

module.exports = router;