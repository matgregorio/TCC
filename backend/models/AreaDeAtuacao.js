const mongoose = require('mongoose');

const areaDeAtuacaoSchema = new mongoose.Schema({
    areaDeAtuacao:{
        type: String,
        required: true,
        unique: true
    }
});

const AreaDeAtuacao = mongoose.model('AreaDeAtuacao', areaDeAtuacaoSchema);

module.exports = AreaDeAtuacao;