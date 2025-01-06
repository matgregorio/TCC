const router = require('express').Router()
const participanteController = require('../controllers/participanteController')
const {authMiddleware, isAdmin} = require('../middleware/auth');
const {loginLimiter} = require('../middleware/rateLimiter');

//rota não protegida
router.post('/participantes', participanteController.criarParticipante);
router.post('/login' ,loginLimiter, participanteController.loginParticipante);
router.post('/token', participanteController.renovarToken);
router.post('/logout', participanteController.revogarToken);

//rota protegida para administradores
router.get('/participantes', authMiddleware,isAdmin, participanteController.listarParticipantes);
router.get('/participantes/:id',authMiddleware,isAdmin, participanteController.buscarParticipante);
router.delete('/participantes/:id', authMiddleware,participanteController.deletarParticipante);

//rota protegida para estudantes
router.put('/participantes/:id', authMiddleware, participanteController.editarParticipante);





module.exports = router;