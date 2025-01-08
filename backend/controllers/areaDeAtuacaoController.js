const AreaDeAtuacao = require('../models/AreaDeAtuacao');

module.exports = class areaDeAtuacao{
    static async criarAreaDeAtuacao(req,res){
        const{nome} = req.body;

        try{
            const areaDeAtuacao = await AreaDeAtuacao.create({nome});
            res.status(201).json({message: 'Área de atuação criada com sucesso', areaDeAtuacao})
        }catch(error){
            res.status(500).json({message: 'Erro ao criar área de atuação', error});
        }
    }

    static async listarAreaDeAtuacao(req, res){
        try{
            const areaDeAtuacao = await AreaDeAtuacao.find();
            re.status(200).json(areaDeAtuacao);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar áreas de atuação. ', error});
        }
    }

    static async atualizarAreaDeAtuacao(req, res){
        const{id} = req.params;
        const{nome} = req.body;

        try{
            const areaDeAtuacao = await AreaDeAtuacao.findByIdAndUpdate(
                id,
                {nome},
                {new: true} 
            );
            if(!areaDeAtuacao){
                return res.status(404).json({message:'Área de atuação não encontrada'});
            }
            res.status(200).json({message: 'Área de atuação atualizada com sucesso', areaDeAtuacao});
        }catch(error){
            res.status(500).json({message:'Erro ao atualizar área de atuação', error});
        }
    }

    static async deletarAreaDeAtuacao(req, res){
        const{id} = req.params;

        try{
            const areaDeAtuacao = await AreaDeAtuacao.findByIdAndDelete(id);
            if(!instituicao){
                return res.status(404).json({message:'Área de atuação não encontrada'});
            }
            res.status(200).json({message: 'Área de atuação deletada com sucesso'});
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar área de atuação', error});
        }
    }
}