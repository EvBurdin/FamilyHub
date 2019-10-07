const { Coordinate } = require('../../../models/Index');

module.exports = {
  async getMyCoordinates(req, res) {
    res.json(await req.user.getCoordinates({ limit: 1, order: [['timestamp', 'DESC']] }));
  },
  async setMyCoordinates(req, res) {
    const {
      accuracy, //
      altitude,
      heading,
      latitude,
      longitude,
      timestamp,
      speed,
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
  },
};
