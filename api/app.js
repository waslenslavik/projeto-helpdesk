const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dbconnection = require('./dbconnection');
const userRegistrationAPI = require('./userRegistrationAPI');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de roteamento estático para a pasta cadastro
app.use('/cadastro', express.static(path.join(__dirname, '..', 'cadastro')));

// Configuração de roteamento estático para a pasta login (CSS e imagens)
app.use('/login', express.static(path.join(__dirname, '..', 'login')));
app.use('/login/img', express.static(path.join(__dirname, '..', 'login', 'img')));

app.use('/api', userRegistrationAPI);

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login', 'login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'cadastro', 'cadastro.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
