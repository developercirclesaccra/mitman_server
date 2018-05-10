'use strict'

const express = require('express');
const router = express.Router();

const User = require('../models/user');

const authenticateRequest = require('../utils/authenticate-request');

router.get('/', authenticateRequest, (req, res) => {
  res.status(200).send('User');
});

router.post('/', authenticateRequest, (req, res) => {
  if (!req.body.first_name && !req.body.last_name && !req.body.fb_id) {
    return req.status(400).json({
      success: false,
      msg: 'User record can not be empty',
    });
  }
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    fb_id: req.body.fb_id,
    meetup: req.body.meetup
  });

  User.create(user, authenticateRequest, (err, user) => {
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

router.get('/:userid', authenticateRequest, (req, res) => {
  let user_id = req.params.userid;
  User.get(user_id, (err, user) => {
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
  });
});

router.put('/:userid', authenticateRequest, (req, res) => {
  if (!req.body.first_name && !req.body.last_name && !req.body.fb_id) {
    return req.status(400).json({
      success: false,
      msg: 'User record can not be empty',
    });
  }
  User.updateuser(req.body, (err, user) => {
    if (err) {
      return res.status(500).json({
        success: false,
        msg: 'Error updating user data',
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
      msg: 'Successfully updated user data',
      user: user,
    });
  })
});

router.delete('/:userid', authenticateRequest, (req, res) => {
  User.deleteuser(req.params.userid, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        msg: 'Error deleting user data',
        err: err,
      });
    };
    
    res.status(200).json({
      success: true,
      msg: 'Successfully deleted user data'
    });
  })
})

module.exports = router;