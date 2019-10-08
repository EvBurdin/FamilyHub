const io = require('socket.io');
const {
 Coordinate, Location, Sequelize, sequelize 
} = require('../../../models/Index');

const { Op } = Sequelize;
module.exports = {
  async getMyCoordinates(req, res) {
    res.json(await req.user.getCoordinates({ limit: 1, order: [['timestamp', 'DESC']] }));
  },
  async setMyCoordinates(req, res) {
    const { user } = req;
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
    const familys = await user.getFamilys({ attributes: ['id'], joinTableAttributes: [] });
    const familysId = familys.map((el) => el.id);
    const jsonGeo = JSON.stringify({ type: 'Point', coordinates: [longitude, latitude] });
    const radius = 0.002;
    const curLoccation = await sequelize.query(
      `SELECT *
      FROM "Locations"
      WHERE ST_DWithin(
        point,
        ST_GeomFromGeoJSON(:jsonGeo),
        :radius
      ) AND "FamilyId" in(:familysId);`,
      {
        replacements: { jsonGeo, radius, familysId },
        type: sequelize.QueryTypes.SELECT,
      },
    );
    global.io.sockets.emit('hi', 'everyone');
    res.json(curLoccation);
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
