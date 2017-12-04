'use strict'

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  gender: { type: String, enum:["male", "female"]},
  fb_id: { type: String, unique: true },
  email: { type: String },
  phone_number: { type: String },
  meetups: [{type: String}]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addUser = (user, callback) => {
  //newUser.save(callback);

  User.findOne(
    { fb_id: user.fb_id },
    (err, userFound) => {
      if (err) {
        throw err;
      };
      if (!err && !userFound) {
        console.log('*user not found, adding new user: ', user);
        let newUser = new User(user);
        newUser.save(callback);
      } else {
        console.log('*user exists, updating: ', user);
        User.update(
          { fb_id: user.fb_id },
          { $addToSet: { meetups: user.meetup } },
          callback
        )
      }
    }
  );
};

module.exports.getUserByFbId = (fbId, callback) => {
  User.findOne({ fb_id: fbId }, callback);
};