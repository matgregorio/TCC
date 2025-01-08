const Evento = require('../models/Evento');

module.exports = class EventoController{
    static async criarEvento(req, res){
        const {nome, anoDeReferencia} = req.body;

        try{
            const novoEvento = new Evento({
                nome,
                anoDeReferencia
            });

            await novoEvento.save();

            res.status(201).json({message: 'Evento criado com sucesso', evento: novoEvento});
        }catch(error){
            res.status(500).json({message: 'Erro ao criar evento', error});
        }
    }

    static async listarEvento(req, res){
        try{
            const evento = await Evento.find();
            res.status(200).json(evento);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar eventos.', error});
        }
    }

    static async atualizarEvento(req, res){
        const{id} = req.params;
        const{nome, anoDeReferencia} = req.body;

        try{
            const evento = await Evento.findByIdAndUpdate(
                id,
                {nome},
                {anoDeReferencia},
                {new: true}
            );
            if(!evento){
                return res.status(404).json({message: 'Evento não encontrado'});
            }
            res.status(200).json({message: 'Evento atualizado com sucesso', evento});
        }catch(error){
            res.status(500).json({message:'Erro ao atualizar evento', error});
        }
    }

    //verificar se será necessário deletar evento!
}