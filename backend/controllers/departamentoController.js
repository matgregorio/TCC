const Departamento = require('../models/Departamento');

module.exports = class departamento{
    static async criarDepartamento(req, res){
        const {nome} = req.body;

        try{
            const departamento = await Departamento.create({nome});
            res.status(201).json({message: 'Departamento criado com sucesso', departamento})
        }catch(error){
            res.status(500).json({message: 'Erro ao criar departamento', error});
        }
    }

    static async listarDepartamento(req, res){
        try{
            const departamento = await Departamento.find();
            res.status(200).json(departamento);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar departamentos', error});
        }
    }

    static async atualizarDepartamento(req,res){
        const{id} = req.params;
        const{nome} = req.body;

        try{
            const departamento = await Departamento.findByIdAndUpdate(
                id,
                {nome},
                {new: true}
            );

            if(!departamento){
                return res.status(404).json({message:'Departamento não encontrado'});
            }
            res.status(200).json({message: 'Departamento atualizado com sucesso', departamento});
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar departamento', error});
        }
    }

    static async deletarDepartamento(req,res){
        const{id} = req.params;

        try{
            const departamento = await Departamento.findByIdAndDelete(id);
            if(!departamento){
                return res.status(404).json({message:'Departamento não encontrado'});
            }
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar departamento', error});
        }
    }
}