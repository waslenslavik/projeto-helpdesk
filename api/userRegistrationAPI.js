const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbconnection');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para cadastro

app.get('/cadastro', (req,res)=> {
    res.sendFile(__dirname + '/cadastro.html')
})

app.post('/cadastro', (req, res) => {
    const { nome, email, dominio } = req.body;
    // Verificar domínio válido
    if (dominio !== 'acesse.net.br') {
        return res.status(403).json({ error: 'Domínio não permitido, somente domínio acesse.' });
    }

    // Realizar cadastro do usuário
    const usuario = { nome, email, senha };

    db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [usuario.nome, usuario.email, usuario.senha], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }

        return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    });
});

// Rota para o Login
app.post('/login', (req, res) => {
    const { nome, senha } = req.body;

    // Consulta no banco de dados para verificar as credenciais
    db.query('SELECT * FROM usuarios WHERE nome = ? AND senha = ?', [nome, senha], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao fazer login.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        // Autenticação bem sucedida
        return res.status(200).json({ message: 'Login bem-sucedido' });

        // Redireciona homepage
        res.send('<script>window.location.href = "/pagina-inicial";<script>');
    });
});

// Inserir usuário no DB após as rotas (fora do escopo das rotas)
app.post('/inserir-usuario', (req, res) => {
    const usuario = req.body;

    db.query('INSERT INTO usuarios SET ?', usuario, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
        }

        return res.status(200).json({ message: 'Usuário cadastrado com sucesso', result });
    });
});

module.exports = app; // Exportar o app
