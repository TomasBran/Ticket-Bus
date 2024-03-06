const { Router } = require('express');
const {
  getAll,
  getCityById,
  createCity,
  updateCity,
  deleteCity
} = require('../controllers/city');
const { validateSchema } = require('../middlewares/validateSchema');
const { cityBodySchema } = require('../schemas/citySchema');

const router = Router();

router.get('/', getAll);

router.get('/:id', getCityById);

router.post('/', validateSchema(cityBodySchema), createCity);

router.put('/:id', validateSchema(cityBodySchema), updateCity);

router.delete('/:id', deleteCity);

module.exports = router;
