const mongoose = require('mongoose');

const instituicaoSchema = new mongoose.Schema({
    intituicao:{
        type: String,
        required: true,
        unique: true
    }
});

const Instituicao = mongoose.model('Instituicao', instituicaoSchema);

module.exports = Instituicao;