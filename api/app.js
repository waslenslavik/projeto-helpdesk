const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('./dbconnection');
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

app.post('/api/cadastro', (req,res) => {
    const {nome, senha} = req.body;

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao cadastrar usuário'});
        }

        const usuario = {nome, senha:hash};

        db.query('INSERT INTO usuarios (nome, senha) VALUES (?, ?)', [usuario.nome, usuario.senha], (dbErr, results) => {
            if (dbErr) {
                console.error(dbErr);
                return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
            }
            
            return res.status(201).json({ message: 'Usuario cadastrado com sucesso' });
        });
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
