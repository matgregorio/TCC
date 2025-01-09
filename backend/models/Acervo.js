const mongoose = require('mongoose');
const Evento = require('./Evento');

const acervoSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true,
        unique: true
    },
    autores:{
        type: String,
        required: true,
        unique: true
    },
    palavrasChave:{
        type: String,
        required: true
    },
    arquivo:{
        type: String,
        required:true
    },
    evento:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Evento',
        required:true
    },
    criadoEm:{
        type:Date,
        default: Date.now
    },
    editadoEm:{
        type: Date,
        default: Date.now
    },
    deletado:{
        type:Boolean,
        default: false
    }
});

const Acervo = mongoose.model('Acervo', acervoSchema)

module.exports = Acervo;