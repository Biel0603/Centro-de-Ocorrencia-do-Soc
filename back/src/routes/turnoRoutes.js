const express = require('express');
const { listar, buscarPorId, criar } = require('../controllers/turnoController');
const { autenticar } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(autenticar);

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);

module.exports = router;
