'use strict'

const mongoose = require('mongoose');

const MeetupSchema = mongoose.Schema({
  name: { type: String },
  format: { type: String, enum: ["Tech Talk", "Workshop", "Hackathon", "Viewing Party", "Hybrid"] },
  date: { type: String },
  start_time: { type: String },
  end_time: { type: String },
  feedback_time: { type: String },
  venue: { type: String },
  description: { type: String },
  agenda: { type: String },
  is_swag: { type: Boolean },
  organizer: { type: String },
});

const Meetup = module.exports = mongoose.model('Meetup', MeetupSchema);

module.exports.addMeetup = (newMeetup, callback) => {
  newMeetup.save(callback);
};

module.exports.getMeetupById = (meetupId, callback) => {
  Meetup.findById(meetupId, callback);
}