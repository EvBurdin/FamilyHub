const passport = require('passport');
const express = require('express');
const auth = require('./auth');
const { isTodat } = require('../helpers/helpers');

const {
 User, Coordinate, Family, Sequelize, Todo, sequelize 
} = require('../models/Index');

const { Op } = Sequelize;
const router = express.Router();

function dismissProtectedFields(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
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
router
  .route('/coordinates')
  .get(auth, async (req, res) => {
    res.json(await req.user.getCoordinates({ limit: 1, order: [['timestamp', 'DESC']] }));
  })
  .post(auth, async (req, res) => {
    const {
 accuracy, altitude, heading, latitude, longitude, timestamp, speed 
} = req.body;
    const { id: UserId } = req.user;
    Coordinate.create({
      accuracy,
      altitude,
      heading,
      latitude,
      longitude,
      speed,
      timestamp: new Date(+timestamp),
      UserId,
    });
    res.json('Success');
  });

router
  .route('/user/family')
  .get(auth, async (req, res) => {
    const { user } = req;
    const familys = await user.getFamilys();
    res.json(familys);
  })
  .put(auth, async (req, res) => {
    const { user } = req;
    const { id } = req.body;
    await user.addFamilys(id);
    res.json('success');
  });

router
  .route('/user/todo')
  .get(auth, async (req, res) => {
    const { user } = req;
    const todos = await user.getTodos({
      attributes: { exclude: ['FamilyId'] },
      include: [{ model: Family, attributes: ['id', 'familyName'] }],
    });
    res.json(todos);
  })
  .post(auth, async (req, res) => {
    const { user } = req;
    const { goal, familyId: FamilyId } = req.body;
    await Todo.create({ goal, FamilyId, author: user.id });
    res.json('success');
  })
  .put(auth, async (req, res) => {
    const { user } = req;
    const { id, goal, active } = req.body;
    const todo = await Todo.findOne({ where: { id } });
    todo.goal = goal || todo.goal;
    todo.active = !!active;
    todo.save();
    res.json('success');
  });

router.route('/user/:username').get(auth, async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ where: { username } });
  res.json(dismissProtectedFields(user));
});

router.route('/family').post(auth, async (req, res) => {
  const { familyName } = req.body;
  const family = await Family.create({ familyName });
  res.json(family);
});
router.route('/family/users').get(auth, async (req, res) => {
  const { user } = req;
  const family = await user.getFamilys({
    attributes: ['id', 'familyName'],
    joinTableAttributes: [],
    include: [
      {
        model: User,
        as: 'Users',
        attributes: { exclude: ['hash', 'salt'] },
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.json(family);
});
router.route('/family/coordinates').get(auth, async (req, res) => {
  const { user } = req;
  const today = new Date().toISOString().slice(0, 10);
  console.log(today);
  const family = await user.getFamilys({
    attributes: ['id', 'familyName'],
    joinTableAttributes: [],
    include: [
      {
        model: User,
        as: 'Users',
        attributes: ['username'],
        through: {
          attributes: [],
        },
        include: [
          {
            model: Coordinate,
            where: {
              [Op.and]: [
                sequelize.where(sequelize.fn('DATE', sequelize.col('timestamp')), sequelize.literal('CURRENT_DATE')),
                { UserId: { [Op.ne]: user.id } },
              ],
            },
            attributes: ['latitude', 'longitude', 'timestamp'],
          },
        ],
      },
    ],
  });
  res.json(family);
});
router.route('/family/todo').get(auth, async (req, res) => {
  const { user } = req;
  const todos = await user.getFamilys({
    joinTableAttributes: [],
    attributes: ['id', 'familyName'],
    include: [{ model: Todo, attributes: { exclude: ['FamilyId'] }, include: [{ model: User }] }],
  });
  res.json(todos);
});
module.exports = router;
