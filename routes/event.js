'use strict'

const express = require('express');
const router = express.Router();

const Event = require('../models/event');

const authenticateRequest = require('../utils/authenticate-request');

router.get('/', authenticateRequest, (req, res) => {
  res.status(200).send('Event');
});

router.post('/', authenticateRequest, (req, res) => {
  let newEvent = new Event({
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

  Event.addEvent(newEvent, (err, event) => {
    if (err) {
      return res.status(500).json({
        success: false,
        msg: 'Error adding event record',
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      msg: 'Successfully added event record',
      event: event,
    });
  });
});

router.get('/:eventid', authenticateRequest, (req, res) => {
  let eventId = req.params.eventid;
  Event.getEventById(eventId, (err, event) => {
    if (err) {
      return res.status(500).json({
        success: false,
        msg: 'Error getting event record',
        err: err,
      });
    };
    if (!err && !event) {
      return res.status(404).json({
        success: false,
        msg: 'Event record not found',
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      msg: 'Successfully obtained event record',
      event: event,
    });
  })
})

module.exports = router;