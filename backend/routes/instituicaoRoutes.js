const express = require('express');
const router = express.Router();
const instituicaoController = require('../controllers/InstituicaoController');
const {authMiddleware, isAdmin} = require('../middleware/auth');

router.post('/instituicao', authMiddleware, isAdmin, instituicaoController.criarInstituicao);
router.get('/instituicao', instituicaoController.listarInstituicoes);
router.put('/instituicao/:id', authMiddleware, isAdmin, instituicaoController.atualizarInstituicao);
router.delete('/instituicao/:id', authMiddleware, isAdmin, instituicaoController.deletarInstituicao);

module.exports = router;