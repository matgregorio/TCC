const jwt = require('jsonwebtoken');
const Participante = require('../models/Participante');
const nodemailer = require('nodemailer');
const EmailTemplate = require('../models/EmailTemplate');
const EmailService = require('../utils/emailService');

module.exports = class authController {
    static async solicitarRecuperacaoSenha(req, res) {
        const { cpf } = req.body;

        try {
            const participante = await Participante.findOne({ cpf });
            if (!participante) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            //gera um token jwt para a recuperação da senha
            const resetToken = jwt.sign(
                { id: participante._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }//token válido por uma hora    
            );

            participante.resetToken = resetToken;
            participante.resetTokenExpires = Date.now() + 3600000; //1 hora
            await participante.save();

            const template = await EmailTemplate.findOne({name: 'recuperacaoSenha'});
            if(!template){
                return res.status(500).json({message: 'Template de e-mail não configurado'});
            }
            
            const emailBody = template.body
            .replace('{{nome}}', participante.nome)
            .replace('{{url}}', `${process.env.FRONTEND_URL}/resetar-senha/${resetToken}`);
            
            //enviar o email
            await EmailService.sendEmail(participante.email, template.subject, emailBody);
            
            res.status(200).json({message: 'E-mail de recuperação enviado com sucesso. '});
        }catch(error){
            res.status(500).json({message: 'Erro ao solicitar recuperação de senha ', error});
        }
    }

    static async redefinirSenha(req,res){
        const{token, novaSenha} = req.body;

        try{
            //verifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const participante = await Participante.findOne({
                _id: decoded.id,
                resetToken: token,
                resetTokenExpires: {$gt: Date.now()},//certificando que o token não expirou
            });

            if(!participante){
                return res.status(400).json({message: 'Token inválido ou expirado.'});
            }

            //atualiza senha
            const senhaCriptografada = await bcrypt.hash(novaSenha,10);
            participante.senha = senhaCriptografada;
            participante.resetToken = undefined;
            participante.resetTokenExpires = undefined;
            await participante.save();

            res.status(200).json({message: 'Senha redefinida com sucesso'});
        }catch(error){
            res.status(500).json({message:'Erro ao redefinir senha.', error});
        }
    };
}