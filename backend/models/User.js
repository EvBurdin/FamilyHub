const db = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = new db.Schema({
  username: String,
  createDate: { type: Date, default: new Date() },
  googleId: db.Schema.Types.Mixed,
  firstName: String,
  lastName: String,
  fullName: String,
  locale: String,
  avatar: String,
  email: String,
  photo: String,
  family: String,
});

UserSchema.statics.findOrCreate = async function (profile, accessToken, refreshToken, cb) {
  let user = await this.findOne({ googleId: profile.id });
  if (!user) {
    user = new db.model('User', UserSchema)({
      googleId: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      fullName: profile.displayName,
      locale: profile._json.locale,
      photo: profile.photos[0].value,
      email: profile.emails[0].value,
    });
    await user.save();
  }
  const err = '';
  cb(err, user);
};
UserSchema.plugin(passportLocalMongoose);
module.exports = db.model('User', UserSchema);
