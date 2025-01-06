const nodemailer = require('nodemailer');
const { param } = require('../routes/adminTemplateRoutes');

class emailService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    /**
     * 
    * @param{String} to 
    * @param{string} subject
    * @param{string} html
     */

    async sendEmail(to,subject, html){
        try{
            const info = await this.transporter.sendEmail({
                from: process.env.EMAIL_USER,
                to,
                subject,
                html,
            });

            console.log(`E-mail enviado para ${to}: ${info.messageId}`);
            return info;
        }catch(error){
            console.error(`Erro ao enviar e-mail para ${to}`, error);
            throw new Error('Erro ao enviar email');
        }
    }

}

module.exports = new emailService();