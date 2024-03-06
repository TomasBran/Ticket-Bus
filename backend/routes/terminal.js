const { Router } = require('express');
const {
  getAll,
  getTerminalById,
  createTerminal,
  updateTerminal,
  deleteTerminal
} = require('../controllers/terminal');
const { terminalBodySchema } = require('../schemas/terminalSchema');
const { validateSchema } = require('../middlewares/validateSchema');

const router = Router();

router.get('/', getAll);

router.get('/id/:id', getTerminalById);

router.post('/', validateSchema(terminalBodySchema), createTerminal);

router.put('/:id', validateSchema(terminalBodySchema), updateTerminal);

router.delete('/:id', deleteTerminal);

module.exports = router;
