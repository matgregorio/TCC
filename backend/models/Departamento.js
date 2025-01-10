const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
    nome_departamento:{
        type:String,
        required: true,
        unique: true
    },
});

const Departamento = mongoose.model('Departamento', departamentoSchema)

module.exports = Departamento;

