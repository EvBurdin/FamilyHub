const Sequelize = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');
const sequelize = require('./sequelize');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  hash: {
    type: Sequelize.STRING(1234),
  },
  salt: {
    type: Sequelize.STRING,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  full_name: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.getDataValue('first_name')} ${this.getDataValue('last_name')}`;
    },
  },
  photo: {
    type: Sequelize.STRING,
  },
  family: {
    type: Sequelize.STRING,
  },
});

passportLocalSequelize.attachToUser(User, {
  usernameField: 'username',
  hashField: 'hash',
  saltField: 'salt',
});

// const db = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
// const UserSchema = new db.Schema({
//   username: String,
//   createDate: { type: Date, default: new Date() },
//   googleId: db.Schema.Types.Mixed,
//   firstName: String,
//   lastName: String,
//   fullName: String,
//   locale: String,
//   avatar: String,
//   email: String,
//   photo: String,
//   family: String,
// });

// UserSchema.statics.findOrCreate = async function (profile, accessToken, refreshToken, cb) {
//   let user = await this.findOne({ googleId: profile.id });
//   if (!user) {
//     user = new db.model('User', UserSchema)({
//       googleId: profile.id,
//       firstName: profile.name.givenName,
//       lastName: profile.name.familyName,
//       fullName: profile.displayName,
//       locale: profile._json.locale,
//       photo: profile.photos[0].value,
//       email: profile.emails[0].value,
//     });
//     await user.save();
//   }
//   const err = '';
//   cb(err, user);
// };
// UserSchema.plugin(passportLocalMongoose);
module.exports = User;
