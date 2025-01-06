const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String, 
        required: true
    },
    body:{
        type: String,
        required: true
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);

module.exports = EmailTemplate;