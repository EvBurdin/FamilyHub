const User = require('../models/User');
const Сoordinates = require('../models/Сoordinates');
const Family = require('../models/Family');
const userFamily = require('../models/userFamily');

async function forceSchemaUpdate() {
  await User.sync({ alter: true });
  //   await User.create({ username: 'John', last_name: 'Hancock' });
  await Сoordinates.sync({ alter: true });
  //   await Сoordinates.create({
  //     latitude: 55.7088878,
  //     longitude: 37.5927756,
  //     timestamp: 1570123187439,
  //     userId: 1,
  //   });
  // await Family.sync({ alter: true });
  // await userFamily.sync({ alter: true });
  console.log('Seeding successed');
}
module.exports = forceSchemaUpdate;
