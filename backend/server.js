/*
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

*/
const https = require('https');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

dotenv.config();

//certificados autoassinados
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
};

app.use(cors({
    origin: 'http://localhost:8080',
}));

//Middlaware e rotas
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('conectado ao MongoDB'))
.catch(err => console.log('erro de conexão', err));


app.use('/api', require('./routes/participanteRoutes'));
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/adminTemplateRoutes'));

//inciar servidor https
https.createServer(options, app).listen(5000,()=>{
    console.log('Servidor rodando em https://localhost:5000');
})
    