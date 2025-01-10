const Cursos = require('../models/Cursos');

module.exports = class cursos{
    static async criarCursos(req, res){
        const {nome} = req.body;

        try{
            const cursos = await Cursos.create({nome});
            res.status(201).json({message:'Curso criado com sucesso', cursos})
        }catch(error){
            res.status(500).json({message:'Erro ao criar curso'})
        }
    }

    static async listarCursos(req, res){
        try{
            const cursos = await Cursos.find();
            res.status(200).json(cursos);
        }catch(error){
            res.status(500).json({message:'Erro ao listar cursos', error});
        }
    }

    static async atualizarCursos(req, res){
        const{id} = req.params;
        const{nome} = req.body;

        try{
            const cursos = await Cursos.findByIdAndUpdate(
                id,
                {nome},
                {new:true}
            );

            if(!cursos){
                return res.status(404).json({message: 'Curso não encontrado!'})
            }
            res.status(200).json({message: 'Curso atualizado com sucesso', curso});
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar curso', error});
        }
    }

    static async deletarCursos(req, res){
        const{id} = req.params;

        try{
            const cursos = await Cursos.findByIdAndDelete(id);
            if(!cursos){
                return res.status(404).json({message:'Curso não encontrado'});
            }
            res.status(200).json({message:'Curso deletado com sucesso'});
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar curso', error});
        }
    }
}