const User = require('../models/User');
const Сoordinates = require('../models/Сoordinates');

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
  console.log('Seeding successed');
}
module.exports = forceSchemaUpdate;
