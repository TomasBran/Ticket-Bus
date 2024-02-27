const {
  Terminal,
  Sequelize: { Op }
} = require('../database/models');

const getTerminalById = async (id) =>
  await Terminal.findByPk(id, {
    include: ['city']
  });

const getTerminals = async () => await Terminal.findAll({ include: ['city'] });

const createTerminal = async (lat, lon, cityId, terminalName, terminalCode) => {
  const { id } = await Terminal.create({
    lat,
    lon,
    cityId,
    terminalName,
    terminalCode
  });
  // TODO posible add exception when id is null
  return await getTerminalById(id);
};

const updateTerminal = async (
  id,
  lat,
  lon,
  cityId,
  terminalName,
  terminalCode
) => {
  await Terminal.update(
    {
      lat,
      lon,
      cityId,
      terminalName,
      terminalCode
    },
    {
      where: { id }
    }
  );

  return await getTerminalById(id);
};

const deleteTerminal = async (id) => await Terminal.destroy({ where: { id } });

const checkTerminalExistsByCode = async (terminalCode) =>
  Boolean(await Terminal.findOne({ where: { terminalCode } }));

const checkTerminalExistsByCodeNoId = async (terminalCode, id) =>
  Boolean(
    await Terminal.findOne({
      where: { terminalCode, id: { [Op.not]: id } }
    })
  );

module.exports = {
  getTerminalById,
  getTerminals,
  createTerminal,
  updateTerminal,
  deleteTerminal,
  checkTerminalExistsByCode,
  checkTerminalExistsByCodeNoId
};
