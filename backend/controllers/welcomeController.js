const EmailTemplate = require('../models/EmailTemplate');
const EmailService = require('../utils/emailService');

module.exports = class welcomeController{
    static async enviarBoasVindas(req,res){
        const{email, nome} = req.body;

        try{
            const template = await EmailTemplate.findOne({name: 'bemVindo'});
            if(!template){
                return res.status(500).json({message: 'Template de e-mail não configurado'});
            }

            const emailBody = template.body.replace('{{nome}}', nome);

            await EmailService.sendEmail(email, template.subject, emailBody);

            res.status(200).json({message: 'E-mail de boas-vindas enviado com sucesso'});
        }catch(error){
            res.status(500).json({message: 'Erro ao enviar e-mail de boas-vindas.', error});
        }
    }
}