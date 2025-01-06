const Participante = require('../models/Participante');
const RefreshToken = require('../models/RefreshToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const refreshTokens = [];
const logger = require('../utils/logger');

module.exports = class participanteController {

    static async loginParticipante(req, res) {
        const { cpf, senha } = req.body;

        try {
            const participante = await Participante.findOne({ cpf });
            if (!participante || !(await bcrypt.compare(senha, participante.senha))) {
                logger.warn(`Tentativa de login falhou. CPF: ${cpf}`);
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            const accessToken = jwt.sign(
                { id: participante._id, tipoParticipante: participante.tipoParticipante },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            const refreshTokenValue = jwt.sign(
                { id: participante._id, tipoParticipante: participante.tipoParticipante },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '7d' }
            );

            const refreshToken = new RefreshToken({
                userId: participante._id,
                token: refreshTokenValue,
            });

            await refreshToken.save();

            logger.info(`Login bem-sucedido. CPF: ${cpf}, Token: ${accessToken}`);
            res.status(200).json({
                message: 'Login realizado com sucesso!',
                accessToken,
                refreshToken: refreshTokenValue,
            });
        } catch (error) {
            logger.error(`Erro no login. CPF: ${cpf}, Erro: ${error.message}`);
            res.status(500).json({ message: 'Erro no login', error });
        }
    };


    static async criarParticipante(req, res) {

        const { cpf, senha, nome, email, telefone } = req.body;

        try {
            const participanteExistente = await Participante.findOne({ $or: [{ cpf }, { email }] });
            if (participanteExistente) {
                return res.status(400).json({ message: 'CPF ou e-mail já registrados' });
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const novoParticipante = new Participante({
                cpf,
                senha: senhaCriptografada,
                nome,
                email,
                telefone,
                tipoParticipante: "aluno"
            });

            await novoParticipante.save();

            //gera o token JWT
            const token = jwt.sign({
                id: novoParticipante._id, tipoParticipante: novoParticipante.tipoParticipante
            },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }// serve para falar que o código expira em 1 hora
            );
            res.status(201).json({ message: 'Participante criado com sucesso', participante: novoParticipante, token });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar participante', error });
        }
    }

    static async listarParticipantes(req, res) {
        try {
            const participantes = await Participante.find({ deletado: false });
            res.status(200).json(participantes);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar participantes', error });
        }
    }

    static async buscarParticipante(req, res) {
        const { id } = req.params;

        try {
            const participante = await Participante.findById(id);
            if (!participante) {
                return res.status(404).json({ message: 'Participante não encontrado' });
            }
            res.status(200).json(participante);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar participante', error });
        }
    }

    static async editarParticipante(req, res) {
        const { id } = req.params;
        const { cpf, senha, nome, email, telefone } = req.body;

        try {
            const participante = await Participante.findById(id);
            if (!participante) {
                return res.status(404).json({ message: 'Participante não encontrado' });
            }

            if (senha) {
                participante.senha = await bcrypt.hash(senha, 10);
            }
            participante.cpf = cpf || participante.cpf;
            participante.nome = nome || participante.nome;
            participante.email = email || participante.email;
            participante.telefone = telefone || participante.telefone;
            participante.editadoEm = Date.now();

            await participante.save();
            res.status(200).json({ message: 'Participante atualizado com sucesso', participante });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao editar participante', error });
        }
    }

    static async deletarParticipante(req, res) {
        const { id } = req.params;

        try {
            const participante = await Participante.findById(id);
            if (!participante) {
                return res.status(404).json({ message: 'Participante não encontrado' });
            }

            participante.deletado = true;
            await participante.save();
            res.status(200).json({ message: 'Participante deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar participante' }, error);
        }
    }

    static async renovarToken(req, res) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            logger.warn('Tentativa de renovação falhou - Token ausente');
            return res.status(400).json({ message: 'Refresh token é obrigatório.' });
        }

        try {
            const storedToken = await RefreshToken.findOne({ token: refreshToken });
            if (!storedToken) {
                logger.warn('Tentativa de renovação falhou - Token inválido');
                return res.status(403).json({ message: 'Refresh token inválido ou expirado.' });
            }

            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            const newAccessToken = jwt.sign(
                { id: decoded.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            logger.info(`Token renovado com sucesso. Usuário ID: ${decoded.id}`);
            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            logger.error(`Erro ao renovar token. Token: ${refreshToken}, Erro: ${error.message}`);
            res.status(403).json({ message: 'Erro ao renovar token.', error });
        }
    };

    static async revogarToken(req, res) {
        const { refreshToken } = req.body;
        if(!refreshToken){
            return res.status(400).json({message: 'Refresh token é obrigatório'});
        }

        try {
            const deletedToken = await RefreshToken.findOneAndDelete({ token: refreshToken });

            if (!deletedToken) {
                logger.warn('Tentativa de revogação falhou - Token não encontrado');
                return res.status(404).json({ message: 'Refresh token não encontrado.' });
            }

            logger.info(`Refresh token revogado. Token: ${refreshToken}`);
            res.status(200).json({ message: 'Refresh token revogado com sucesso.' });
        } catch (error) {
            logger.error(`Erro ao revogar token. Token: ${refreshToken}, Erro: ${error.message}`);
            res.status(500).json({ message: 'Erro ao revogar token.', error });
        }
    };
}