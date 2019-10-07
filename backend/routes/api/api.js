/* eslint-disable no-await-in-loop */
const express = require('express');

const router = express.Router();
const userRouter = require('./user/user');
const familyRouter = require('./family/family');
const regLoginRouter = require('./regLogin/regLogin');
const coordinatesRouter = require('./coordinates/coordinates');

router.use('/user', userRouter);
router.use('/family', familyRouter);
router.use('/coordinates', coordinatesRouter);
router.use('/', regLoginRouter);

module.exports = router;
