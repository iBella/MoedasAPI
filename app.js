const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
const expressHandlebars = require('express-handlebars');
const path = require('path');

const stringConnection = config.bd_string;
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
app.use(express.static(path.join(__dirname, 'public')));

const hbs = expressHandlebars.create({
    extname:'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/layouts')
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const usuariosRoutes = require('./routes/usuarios');
const transacoesRoutes = require('./routes/transacoes');

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/transacoes', transacoesRoutes);

app.listen(3000);

module.exports = app;