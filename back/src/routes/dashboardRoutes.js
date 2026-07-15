const express = require('express');
const { indicadores } = require('../controllers/dashboardController');
const { autenticar } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(autenticar);

router.get('/indicadores', indicadores);

module.exports = router;
