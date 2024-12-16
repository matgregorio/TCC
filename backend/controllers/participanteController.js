const Participante = require('../models/Participante');
const bcrypt = require('bcrypt');

exports.criarParticipante = async (req, res) => {
    const{cpf,senha,nome,email,telefone} = req.body;

    try{
        const participanteExistente = await Participante.findOne({$or : [{cpf}, {email}]});
        if(participanteExistente){
            return res.status(400).json({message: 'CPF ou e-mail já registrados'});
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoParticipante = new Participante({
            cpf,
            senha: senhaCriptografada,
            nome,
            email,
            telefone,
            tipoParticipante: aluno
        });

        await novoParticipante.save();
        res.status(201).json({message: 'Participante criado com sucesso', participante: novoParticipante});  
    }catch(error){
        res.status(500).json({message:'Erro ao criar participante', error});
    }

    exports.listarParticipantes = async (req, res) => {
        try{
            const participantes = await Participante.find({deletado: false});
            res.status(200).json(participantes);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar participantes', error});
        }
    };

    exports.buscarParticipante = async (req, res) => {
        const {id} = req.params;

        try{
            const participante = await Participante.findById(id);
            if(!participante){
                return res.status(404).json({message: 'Participante não encontrado'});
            }
            res.status(200).json(participante);
        }catch(error){
            res.status(500).json({message: 'Erro ao buscar participante', error});
        }
    };

    exports.editarParticipante = async (req, res) => {
        const {id} = req.params;
        const {cpf, senha, nome, email, telefone} = req.body;

        try{
            const participante = await Participante.findById(id);
            if(!participante){
                return res.status(404).json({message: 'Participante não encontrado'});
            }

            if(senha){
                participante.senha = await bcrypt.hash(senha,10);
            }
            participante.cpf = cpf || participante.cpf;
            participante.nome = nome || participante.nome;
            participante.email = email || participante.email;
            participante.telefone = telefone || participante.telefone;
            participante.editadoEm = Date.now();

            await participante.save();
            res.status(200).json({message:'Participante atualizado com sucesso', participante});
        }catch(error){
            res.status(500).json({message:'Erro ao editar participante', error});
        }
    }

    exports.deletarParticipante = async (req, res) => {
        const {id} = req.params;

        try{
            const participante = await Participante.findById(id);
            if(!participante){
                return res.status(404).json({message: 'Participante não encontrado'});
            }

            participante.deletado = true;
            await participante.save();
            res.status(200).json({message: 'Participante deletado com sucesso'});
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar participante'}, error);
        }
    };

}