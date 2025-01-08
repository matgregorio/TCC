const mongoose = require('mongoose');

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
    //continuar a desenvolver o acervo
})