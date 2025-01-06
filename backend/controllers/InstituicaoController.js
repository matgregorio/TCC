const Instituicao = require('../models/Instituicao');

module.exports = class instituicaoController{
    static async criarInstituicao(req,res){
        const{nome} = req.body;

        try{
            const instituicao = await Instituicao.create({nome});
            res.status(201).json({message: 'Instituição criada com sucesso', instituicao})

        }catch(error){
            res.status(500).json({message: 'Erro ao criar instituição.' , error});
        }
    }

    static async listarInstituicoes(req,res){
        try{
            const instituicoes = await Instituicao.find();
            res.status(200).json(instituicoes);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar instituições. ', error});
        }
    }

    static async atualizarInstituicao(req,res){
        const{id} = req.params;
        const{nome} = req.body;

        try{
            const instituicao = await Instituicao.findByIdAndUpdate(
                id,
                {nome},
                {new: true}
            );
            if(!instituicao){
                return res.status(404).json({message:'Instituição não encontrada'});
            }
            res.status(200).json({message: 'Instituição atualizada com sucesso', instituicao});
        }catch(error){
            res.status(500).json({message:'Erro ao atualizar instituição ', error});
        }
    }

    static async deletarInstituicao(req,res){
        const{id} = req.params;

        try{
            const instituicao = await Instituicao.findByIdAndDelete(id);
            if(!instituicao){
                return res.status(404).json({message:' Instituição não encontrada. '});
            }
            res.status(200).json({message:'Instituição deletada com sucesso'});
        }catch(error){
            res.status(500).json({message:'Erro ao deletar instituição', error});
        }
    }
}