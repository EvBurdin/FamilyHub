const passport = require('passport');
const express = require('express');
const auth = require('./auth');
const User = require('../models/User');

const router = express.Router();

function dismissProtectedFields(user) {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    photo: user.photo,
    email: user.email,
    group: user.group,
    username: user.username,
  };
}
router.post('/registration', async (req, res, next) => {
  console.log('registering user');
  const { username, password } = req.body;
  const newUser = new User({ username });
  User.register(newUser, password, (e) => {
    if (e) {
      res.status(409);
      res.send('false');
    } else {
      console.log(`user ${req.user} registered!`);
      res.send('true');
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(`User ${req.user.username} loged in`);
  const user = { ...req.user._doc, hash: '', salt: '' };
  console.log(user);
  res.json(user);
});

router.get('/logged', auth, async (req, res) => {
  console.log(req.user);
  console.log(dismissProtectedFields(req.user));

  res.json(dismissProtectedFields(req.user));
});

// строчка чтоб обновить токены
// { accessType: 'offline', prompt: 'consent' }

router.get('/login/google', passport.authenticate('google', { accessType: 'offline', prompt: 'consent' }));

router.get('/logout', auth, async (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('false');
});

router.route('/user/:_id').get(auth, async (req, res) => {
  const user = await User.findOne({ _id: req.params._id }).lean();

  res.json(dismissProtectedFields(user));
});

module.exports = router;
