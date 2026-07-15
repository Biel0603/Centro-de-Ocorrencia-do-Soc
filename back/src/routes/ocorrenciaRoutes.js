const express = require('express');
const {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
  adicionarComentario,
} = require('../controllers/ocorrenciaController');
const { autenticar, autorizar } = require('../middlewares/authMiddleware');

const router = express.Router();

// Todas as rotas de ocorrências exigem autenticação
router.use(autenticar);

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.post('/:id/comentarios', adicionarComentario);

// Apenas supervisores e gestores podem excluir ocorrências
router.delete('/:id', autorizar('SUPERVISOR', 'GESTOR'), remover);

module.exports = router;
