const express = require('express');
const router = express.Router();
const acervoController = require('../controllers/acervoController');
const upload = require('../utils/multerConfig');
const {authMiddleware, isAdmin} = require('../middleware/auth');

router.post('/acervo', authMiddleware, isAdmin, acervoController.criarAcervo);
router.get('/acervo', acervoController.listarAcervos);
router.put('/acervo/:id', authMiddleware, isAdmin, acervoController.criarAcervo);
router.delete('/acervo/:id', authMiddleware, isAdmin, acervoController.deletarAcervo);