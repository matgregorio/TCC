const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, //5 minutos
    max: 5, //5 tentativas permitidas
    message: {
        message: 'Muitas tentativas de login. Tente novamente após 5 minutos.'
    },
    standardHeaders: true, // retorna informações de limite nos cabeçalhos 'RateLimit-*'
    legacyHeaders: false, //Desativa os cabeçalhos 'X-RateLimit-*'
});

module.exports = {loginLimiter};