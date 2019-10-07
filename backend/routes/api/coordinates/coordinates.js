const express = require('express');
const auth = require('../../../helpers/auth');

const router = express.Router();
const controller = require('./controller');

router
  .route('/')
  .get(auth, controller.getMyCoordinates)
  .post(auth, controller.setMyCoordinates);
module.exports = router;
