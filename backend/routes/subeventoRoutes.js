const express = require('express');
const router = express.Router();
const subeventoController = require('../controllers/subeventoController');
const {authMiddleware, isAdmin} = require('../middleware/auth');

router.post('/subevento', authMiddleware, isAdmin, subeventoController.criarSubevento);
router.get('/subevento', subeventoController.listarSubevento);
router.put('/subevento/:id', authMiddleware, isAdmin, subeventoController.editarSubevento);
router.delete('/subevento/:id', authMiddleware, isAdmin, subeventoController.deletarSubevento);

module.exports = router;