const express = require('express');
const router = express.Router();
const areaDeAtuacaoController = require('../controllers/areaDeAtuacaoController');
const {authMiddleware, isAdmin} = require('../middleware/auth');

router.post('/areaDeAtuacao', authMiddleware, isAdmin, areaDeAtuacaoController.criarAreaDeAtuacao);
router.get('/areaDeAtuacao', areaDeAtuacaoController.listarAreaDeAtuacao);
router.put('/areaDeAtuacao/:id', authMiddleware, isAdmin, areaDeAtuacaoController.atualizarAreaDeAtuacao);
router.delete('/areaDeAtuacao/:id', authMiddleware, isAdmin, areaDeAtuacaoController.deletarAreaDeAtuacao);

module.exports = router;