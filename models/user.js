'use strict'

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  gender: { type: String, enum:["male", "female"]},
  fb_id: { type: String, unique: true },
  email: { type: String },
  phone_number: { type: String },
  meetups: [{ type: String }],
  convo_status: { type: String, enum: ["begin", "end", "short_bio", "highest_qualification", "github_username", "rate_html", "rate_css", "rate_javascript", "why_aidahbot", "phone_number", "email"] },
  convo_prompt: { type: Number },
  role: { type: String, enum: ["intern"] },
  short_bio: { type: String },
  highest_qualification: { type: String },
  github_username: { type: String },
  rate_html: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  rate_css: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  rate_javascript: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  why_aidahbot: { type: String }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.create = (user, callback) => {
  user.save(callback);
}

module.exports.get = (userid, callback) => {
  User.findById(userid, callback);
}

module.exports.updateuser = (user, callback) => {
  User.findByIdAndUpdate(user._id, user, { new: true }, callback);
}

module.exports.deleteuser = (userid, callback) => {
  User.findByIdAndRemove(userid, callback);
}