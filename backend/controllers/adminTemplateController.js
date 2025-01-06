const EmailTemplate = require('../models/EmailTemplate');

module.exports = class adminTemplateController{
    static async getAllTemplates(req,res){
        try{
            const templates = await EmailTemplate.find();
            res.status(200).json(templates);
        }catch(error){
            res.status(500).json({message: 'Erro ao obter templates', error});
        }
    }

    static async getTemplateByName(req,res){
        const{name} = req.body;

        try{
            const template = await EmailTemplate.findOne({name});
            if(!template){
                return res.status(404).json({message: 'Template não encontrado'});
            }

            res.status(200).json(template);
        }catch(error){
            res.status(500).json({message: 'Erro ao obter template.', error});
        }
    }

    static async createOrUpdateTemplate(req,res){
        const {name, subject, body} = req.body;

        if(!name || !subject || body){
            return res.status(400).json({message: 'Nome, assunto e corpo do e-mail são obrigatórios'});
        }

        try{
            const template = await EmailTemplate.findOneAndUpdate(
                {name},
                {subject, body, updatedAt: Date.now()},
                {new: true, upsert: true}// cria se não existir
            );
            res.status(200).json({message: 'Template salvo com sucesso', template});
        }catch(error){
            res.status(500).json({message: 'Erro ao salvar template', error});
        }
    };

    static async deletedTemplate(req,res){
        const {name} = req.params;
        try{
            const deletedTemplate = await EmailTemplate.findOneAndDelete({name});
            if(!deletedTemplate){
                return res.status(404).json({message: 'Template não encontrado'});
            }
            res.status(200).json({message: 'Template excluído com sucesso'});
        }catch(error){
            res.status(500).json({message: 'Erro ao excluir template', error});
        }
    }
}