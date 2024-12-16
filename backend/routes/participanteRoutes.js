const express = require('express');
const participanteController = require('../controllers/participanteController');
const router = express.Router();

router.post('/participantes', participanteController.criarParticipante);
router.get('/participantes', participanteController.listarParticipantes);
router.get('/participantes/:id', participanteController.buscarParticipante);
router.put('/participantes/:id', participanteController.editarParticipante);
router.delete('/participantes/:id', participanteController.deletarParticipante);

module.exports = router;