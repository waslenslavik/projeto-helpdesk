const mysql = require('mysql');

//Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '123',
    database: 'users'
});

//Conexão DB
db.connect((err) =>{
    if (err) {
        throw err;
    }
    console.log('Conexão com o DB estabelecida.')
});

module.exports = db;