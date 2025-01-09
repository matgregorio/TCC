const Apoio = require('../models/Apoio');

module.exports = class apioController{
    static async criarApoio(req, res){
        const{nome} = req.body;

        try{
            const apoio = await Apoio.create({nome});
            res.status(201).json({message: 'Apoio criado com sucesso', apoio})
        }catch(error){
            res.status(500).json({message: 'Erro ao criar apoio', error});
        }
    }

    static async listarApoio(req, res){
        try{
            const apoios = await Apoio.find();
            res.status(200).json(apoio);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar apoios', error});
        }
    }

    static async atualizarApoio(req, res){
        const{id} = req.params;
        const{nome} = req.body;

        try{
            const apoio = await Apoio.findByIdAndUpdate(
                id,
                {nome},
                {new: true}
            );
            if(!apoio){
                return res.status(404).json({message: 'Apoio não encontrado'});
            }
            res.status(200).json({message: 'Apoio atualizado com sucesso', apoio});
        }catch(error){
            res.status(500).json({message:'Erro ao atualizar apoio', error});
        }
    }

    static async deletarApoio(req,res){
        const{id} = req.params;

        try{
            const apoio = await Apoio.findByIdAndDelete(id);
            if(!instituicao){
                return res.status(404).json({message: 'Apoio não encontrado'});
            }
            res.status(200).json({message: 'Apoio deletado com sucesso'});
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar apoio', error});
        }
    }
}