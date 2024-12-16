const mongoose = require('mongoose');

const participanteSchema = new mongoose.Schema({
    cpf:{
        type: String,
        required: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    },
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    telefone:{
        type: String, 
        required: true
    },
    tipoParticipante:{
        type: String,
        required: true
    },
    criadoEm:{
        type: Date, 
        default: Date.now
    },
    editadoEm:{
        type: Date, 
        default: Date.now
    },
    deletado:{
        type: Boolean, 
        default: false
    },
});

const Participante = mongoose.model('Participante', participanteSchema)

module.exports = Participante;