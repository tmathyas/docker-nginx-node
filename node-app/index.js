const express = require('express');
const app = express();
const porta = 3000; 


const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fullcycle'
};


const mysql = require('mysql')
const connection = mysql.createConnection(config)

//INSERE SEMPRE QUE INICIA
const sql = "INSERT INTO people(name) values('Tiaraju')"
connection.query(sql, (error, results) => {
    if (error) throw error;
    console.log('Registro inserido com sucesso!');
});

//SELECIONA E MOSTRA TODOS OS REGISTROS
app.get('/', (req, res) => {
    const selectSql = "SELECT name FROM people";
    connection.query(selectSql, (error, results) => {
        if (error) throw error;

        let responseHTML = '<h1>Full Cycle Rocks!</h1>';
        responseHTML += '<ul>';
        results.forEach((row) => {
            responseHTML += `<li>${row.name}</li>`;
        });
        responseHTML += '</ul>';

        res.send(responseHTML);
    });
});

//PERMITE ADICIONAR REGISTRO ATRAVES DA URL: localhost:8008/inserir&nome=[nome]
app.get('/inserir', (req, res) => {
    nome = req.query.nome;

    if (!nome) {
        res.send('<h1>Nome não fornecido como parâmetro.</h1>');
        return;
    }

    const sql = `INSERT INTO people(name) values('${nome}')`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        console.log('Registro inserido com sucesso!');
    });
    let responseHTML = `<h1>Registro ${nome} inserido com sucesso!</h1>`;
    res.send(responseHTML);
});


app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});