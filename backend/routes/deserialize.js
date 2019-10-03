const User = require('../models/User');

async function deserialize(id, done) {
  const user = await User.findOne({
    where: {
      id,
    },
  });
  const err = '';
  done(err, user);
}
module.exports = deserialize;
