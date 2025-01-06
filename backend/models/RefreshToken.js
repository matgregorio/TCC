const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participante',
        required: true,
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
        expires: 7*24*60*60//expira em 7 dias
    },
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;