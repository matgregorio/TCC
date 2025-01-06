const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//solicitar recuperação de senha
router.post('/solicitar-recuperacao', authController.solicitarRecuperacaoSenha);

//redefinir senha
router.post('/redefinir-senha', authController.redefinirSenha);

module.exports = router;