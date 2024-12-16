const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const participanteRoutes = require('./routes/participanteRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('conectado ao MongoDB'))
.catch(err => console.log('erro de conexão', err));

app.use('/api', participanteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log('Servidor rodando na porta ${PORT}');
});
