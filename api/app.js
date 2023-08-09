const express = require('express');
const dbconnection = require('./dbconnection');
const userRegistrationAPI = require('./userRegistrationAPI');

const app = express();

// Configurar middlewares, CORS, etc. se necessário

// Conectar ao banco de dados usando o módulo dbConnection

// Configurar as rotas da API
app.use('/api', userRegistrationAPI);

// Iniciar o servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
