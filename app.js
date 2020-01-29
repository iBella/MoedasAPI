const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const stringConnection = 'mongodb+srv://admin_moedas:admin_moedas@clusterapi-w9p6q.mongodb.net/test?retryWrites=true&w=majority';
const optionsConnection = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true
};
mongoose.connect(stringConnection, optionsConnection);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', (err) => {
    console.log(`Erro na conexão com o banco de dados: ${err}`);
});
mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada do banco de dados.');
});
mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados.');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const indexRoutes = require('./routes/index');
const usuariosRoutes = require('./routes/usuarios');
const transacoesRoutes = require('./routes/transacoes');

app.use('/', indexRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/transacoes', transacoesRoutes);

app.listen(3000);

module.exports = app;