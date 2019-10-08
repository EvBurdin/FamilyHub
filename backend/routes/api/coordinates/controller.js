const { Coordinate, Location, Sequelize } = require('../../../models/Index');

const { Op } = Sequelize;
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
  async getLocations(req, res) {
    const { user } = req;
    const familys = await user.getFamilys({ attributes: ['id'], joinTableAttributes: [] });
    const familysId = familys.map((el) => el.id);
    console.log(familysId);

    const locations = await Location.findAll({ where: { FamilyId: { [Op.in]: familysId } } });

    res.json(locations);
  },
  async setLocation(req, res) {
    const {
      name, //
      description,
      latitude,
      longitude,
      FamilyId,
    } = req.body;
    const point = { type: 'Point', coordinates: [longitude, latitude] };
    await Location.create({
      name,
      description,
      latitude,
      longitude,
      point,
      FamilyId,
    });
    res.json('Success');
  },
};
