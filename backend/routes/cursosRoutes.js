const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursosController');
const {authMiddlware, isAdmin} = require('../middleware/auth');

router.post('/cursos', authMiddlware, isAdmin, cursosController.criarCursos);
router.get('/cursos', cursosController.listarCursos);
router.put('/cursos/:id', authMiddlware, isAdmin, cursosController.atualizarCursos);
router.delete('/cursos/:id', authMiddlware, isAdmin, cursosController.deletarCursos);

module.exports = router;