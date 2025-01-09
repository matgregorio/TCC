const Acervo = require('../models/Acervo');

module.exports = class acervoController{
    static async criarAcervo(req, res){
        const{titulo, autores, palavrasChave, evento} = req.body;
        const arquivo = req.file?.path;

        if(!arquivo){
            return res.status(400).json({message: 'Arquivo PDF é obrigatório'});
        }

        try{
            const acervo = await Acervo.create({
                titulo,
                autores,
                palavrasChave,
                arquivo,
                evento: evento._id
            });
            res.status(201).json({message: 'Acervo criado com sucesso', acervo});
        }catch(error){
            res.status(500).json({message:'Erro ao criar acervo', error});
        }
    }

    static async listarAcervos(req,res){
        try{
            const acervos = await Acervo.find();
            res.status(200).json(acervos);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar acervos', error});
        }
    };

    static async atualizarAcervo(req,res){
        const {id} = req.params;
        const{titulo,autores,palavrasChave, evento} = req.body;
        try{
            const updateData = {
                titulo,
                autores,
                palavrasChave,
                evento: evento._id
            };

            if(req.file){
                updateData.arquivo = req.file.path;
            }

            const acervo = await Acervo.findByIdAndUpdate(id, updateData,{new:true});
            if(!acervo){
                return res.status(404).json({message: 'Acervo não encontrado'});
            }

            res.status(200).json({message: 'Acervo atualizado com sucesso', acervo});
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar acervo', error});
        }
    };

    static async deletarAcervo(req, res){
        const{id} = req.params;

        try{
            const acervo = await Acervo.findByIdAndDelete(id);
            if(!acervo){
                return res.status(404).json({message: 'Acervo não encontrado'});
            }

            res.status(200).json({message: 'Acervo deletado com sucesso'});
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar acervo', error});
        }
    }
}