'use strict'

const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
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
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.addEvent = (newEvent, callback) => {
  newEvent.save(callback);
};

module.exports.getEventById = (eventId, callback) => {
  Event.findOne({ _id: eventId }).populate('user').exec(callback);
}