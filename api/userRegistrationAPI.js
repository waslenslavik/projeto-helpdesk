const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconnection');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/cadastro', (req, res) => {
    const { nome, senha } = req.body;

    const usuario = { nome, senha };

    db.query('INSERT INTO usuarios (nome, senha) VALUES (?, ?)', [usuario.nome, usuario.senha], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    });
});


app.post('/api/login', (req, res) => {
    const { nome, senha } = req.body;

    db.query('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', [nome, senha], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao fazer login.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        return res.status(200).json({ message: 'Login bem-sucedido' });
    });
});

module.exports = app;
