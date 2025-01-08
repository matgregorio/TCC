const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
        unique: true
    },
    anoDeReferencia:{
        type: int,
        required: true,
        unique: true
    }
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;