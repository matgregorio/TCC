const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const {authMiddleware, isAdmin} = require('../middleware/auth');

router.post('/evento', authMiddleware, isAdmin, eventoController.criarEvento);
router.get('/evento', authMiddleware, isAdmin, eventoController.listarEvento);
router.put('/evento/:id', authMiddleware, isAdmin, eventoController.atualizarEvento);

module.exports = router;