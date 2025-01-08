const Subevento = require('../models/Subevento');

module.exports = class subeventoController{
    static async criarSubevento(req, res){
        const {tipo,data,horario,palestranteId,vagas,eventoId,local,titulo,descricao,lattesPalestrante} = req.body;
        try{
            const subeventoExistente = await Subevento.findOne({titulo});
            if(subeventoExistente){
                return res.status(400).json({message :'Subevento já cadastrado'})
            }

            const novoSubevento = new Subevento({
                tipo,
                data,
                horario,
                palestrante: palestrante._id,
                vagas,
                evento: evento._id,
                local,
                titulo,
                descricao,
                lattesPalestrante
            });

            await novoSubevento.save();
            res.status(201).json({message: 'Subevento criado com sucesso', subevento: novoSubevento});
        }catch(error){
            res.status(500).json({message: 'Erro ao criar subevento', error});
        }
    }

    static async listarSubevento(req,res){
        try{
            const subevento = await Subevento.find({deletado: false}).populate('palestrante','nome').populate('evento', 'nome');
            res.status(200).json(subevento);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar subevento', error});
        }
    }

    static async buscarSubevento(req,res){
        const{id} = req.params;
        try{
            const subevento = await Subevento.findById(id);
            if(!evento){
                return res.status(404).json({message: 'Subevento não encontrado'});
            }
            res.status(200).json(subEvento);
        }catch(error){
            res.status(500).json({message: 'Erro ao buscar subevento', error});
        }
    }

    static async editarSubevento(req, res){
        const {id} = req.params;
        const{tipo,data,horario,palestranteId,vagas,eventoId,local,titulo,descricao,lattesPalestrante} = req.body;
        
        try{
            const subevento = await Subevento.findById(id);
            if(!subevento){
                return res.status(404).json({message: 'Subevento não encontrado'});
            }

            subevento.tipo = tipo || subevento.tipo;
            subevento.data = data || subevento.data;
            subevento.horario = horario || subevento.horario;
            subevento.palestrante = palestranteId || subevento.palestrante;
            subevento.vagas || subevento.vagas;
            subevento.evento = eventoId || subevento.evento;
            subevento.local || subevento.local;
            subevento.titulo || subevento.titulo;
            subevento.descricao || subevento.descricao;
            subevento.lattesPalestrante || subevento.lattesPalestrante;

            await subevento.save();
            res.status(200).json({message: 'Subevento atualizado com sucesso', subevento});
        }catch(error){
            res.status(500).json({message: 'Erro ao editar subevento', error});
        }
    }

    static async deletarSubevento(req,res){
        const {id} = req.params;
        try{
            const subevento = await Subevento.findById(id);
            if(!subevento){
                return res.status(404).json({message: 'Subevento não encontrado'});
            }

            subevento.deletado = true;
            await subevento.save();
            res.status(200).json({message: 'Subevento deletado com sucesso'});
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar subevento'}, error);
        }
    }
}