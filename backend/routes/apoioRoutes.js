const express = require('express');
const router = express.Router();
const apoioController = require('../controllers/apoioController');
const {authMiddleware, isAdmin} = require('../middleware/auth');


router.post('/apoio', authMiddleware, isAdmin, apoioController.criarApoio);
router.get('/apoio', authMiddleware, apoioController.listarApoio);
router.put('/apoio/:id', authMiddleware, isAdmin, apoioController.atualizarApoio);
router.delete('/apoio/:id', authMiddleware, isAdmin, apoioController.deletarApoio);

module.exports = router;