const jwt = require('jsonwebtoken');

const authMiddleware = (req,res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ','');

    if(!token){
        return res.status(401).json({message: 'Acesso negado. Token não fornecido. '});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(400).json({message: `Token inválido ${token}`});
    }
};

const isAdmin = (req,res, next) =>{
    if(!req.user || req.user.tipoParticipante !== 'administrador'){
        return res.status(403).json({message: `Acesso negado. Permissão insuficiente ${req.tipoParticipante}`});
    }
    next();
};

module.exports = {authMiddleware, isAdmin};