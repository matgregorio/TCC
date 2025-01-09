const mongoose = require('mongoose');

const apoioSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
        unique: true
    }
});

const Apoio = mongoose.model('Apoio', apoioSchema);

module.exports = Apoio;