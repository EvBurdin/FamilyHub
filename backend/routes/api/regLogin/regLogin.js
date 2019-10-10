const passport = require('passport');
const express = require('express');
const auth = require('../../../helpers/auth');
const chalk = require('chalk');

const router = express.Router();
const controller = require('./controller');

router.post('/registration', controller.userRegister);
router.post('/login', passport.authenticate('local'), controller.userLogin);
router.get('/logged', auth, controller.getCurrentUser);
// строчка чтоб обновить токены
// { accessType: 'offline', prompt: 'consent' }
router.get(
  '/login/google',
  (req, res, next) => {
    console.log(chalk.green(req.cookies));
    next();
  },
  passport.authenticate('google', { accessType: 'offline', prompt: 'consent' }),
);
router.get('/logout', auth, controller.userLogout);
module.exports = router;
