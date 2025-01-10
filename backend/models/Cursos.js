const mongoose = require('mongoose');

const cursosSchema = new mongoose.Schema({
    nome_curso:{
        type: String,
        required: true,
        unique: true
    }
});

const Cursos = mongoose.model('Cursos', cursosSchema)

module.exports = Cursos;