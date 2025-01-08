const mongoose = require('mongoose');

const subeventoSchema = new mongoose.Schema({
    tipo:{
        type: String,
        required: true
    },
    data:{
        type: Date,
        required: true
    },
    horario:{
        type: Date,
        required: true
    },
    duracao:{
        type: int,
        required: true
    },
    palestrante:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Palestrante',
        required: true
    },
    vagas:{
        type: int,
        required: true
    },
    evento:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Instituicao',
        required: true
    },
    local:{
        type: String,
        required: true
    },
    titulo:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    lattesPalestrante:{
        type: String, 
        required: true
    }
});

const Subevento = mongoose.model('Subevento', subeventoSchema)

module.exports = Subevento;