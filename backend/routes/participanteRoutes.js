const router = require('express').Router()
const participanteController = require('../controllers/participanteController')

router.post('/participantes', participanteController.criarParticipante);
router.get('/participantes', participanteController.listarParticipantes);
router.get('/participantes/:id', participanteController.buscarParticipante);
router.put('/participantes/:id', participanteController.editarParticipante);
router.delete('/participantes/:id', participanteController.deletarParticipante);

module.exports = router