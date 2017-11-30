'use strict'

const express = require('express');
const router = express.Router();

const Meetup = require('../models/meetup');

const authenticateRequest = require('../utils/authenticate-request');

router.get('/', authenticateRequest, (req, res) => {
  res.status(200).send('Meetup');
});

router.post('/', authenticateRequest, (req, res) => {
  let newMeetup = new Meetup({
    name: req.body.name,
    format: req.body.format,
    date: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    feedback_time: req.body.feedback_time,
    venue: req.body.venue,
    description: req.body.description,
    agenda: req.body.agenda,
    is_swag: req.body.is_swag,
    organizer: req.body.organizer
  });

  Meetup.addMeetup(newMeetup, (err, meetup) => {
    if (err) {
      return res.status(500).json({
        success: false,
        msg: 'Error adding Meetup record',
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      msg: 'Successfully added Meetup record',
      meetup: meetup,
    });
  });
});

router.get('/:meetupid', authenticateRequest, (req, res) => {
  let meetupId = req.params.Meetupid;
  Meetup.getMeetupById(meetupId, (err, meetup) => {
    if (err) {
      return res.status(500).json({
        success: false,
        msg: 'Error getting meetup record',
        err: err,
      });
    };
    if (!err && !meetup) {
      return res.status(404).json({
        success: false,
        msg: 'Meetup record not found',
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      msg: 'Successfully obtained Meetup record',
      meetup: meetup,
    });
  })
})

module.exports = router;