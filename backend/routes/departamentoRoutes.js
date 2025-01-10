const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');
const {authMiddleware, isAdmin} = require('../middleware/auth');

router.post('/departamento', authMiddleware, isAdmin, departamentoController.criarDepartamento);
router.get('/departamento', authMiddleware, departamentoController.listarDepartamento);
router.put('/departamento/:id', authMiddleware, isAdmin, departamentoController.atualizarDepartamento);
router.delete('/departamento/:id', authMiddleware, isAdmin, departamentoController.deletarDepartamento);

module.exports = router;