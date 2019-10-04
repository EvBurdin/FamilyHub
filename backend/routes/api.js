const passport = require('passport');
const express = require('express');
const auth = require('./auth');
const User = require('../models/User');
const Coordinates = require('../models/Сoordinates');

const router = express.Router();

function dismissProtectedFields(user) {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    fullName: user.full_name,
    photo: user.photo,
    email: user.email,
    group: user.group,
    username: user.username,
  };
}
router.post('/registration', async (req, res, next) => {
  console.log('registering user');
  const { username, password } = req.body;
  // const newUser =  User.create({ username });
  User.register(username, password, (e) => {
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

  res.json(dismissProtectedFields(req.user));
});

router.get('/logged', auth, async (req, res) => {
  console.log(req.user);
  console.log(dismissProtectedFields(req.user));

  res.json(dismissProtectedFields(req.user));
});

router
  .route('/coordinates')
  .get(auth, async (req, res) => {
    res.json(await req.user.getCoordinates({ limit: 1, order: [['timestamp', 'DESC']] }));
  })
  .post(auth, async (req, res) => {
    const {
 accuracy, altitude, heading, latitude, longitude, timestamp, speed 
} = req.body;
    const { id: userId } = req.user;
    Coordinates.create({
      accuracy,
      altitude,
      heading,
      latitude,
      longitude,
      speed,
      timestamp: new Date(+timestamp),
      userId,
    });
    res.json('Success');
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
