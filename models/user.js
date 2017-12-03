'use strict'

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  fb_id: { type: String, unique: true },
  email: { type: String },
  phone_number: { type: String },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addUser = (newUser, callback) => {
  newUser.save(callback);
};

module.exports.getUserByFbId = (fbId, callback) => {
  User.findOne({ fb_id: fbId }, callback);
};