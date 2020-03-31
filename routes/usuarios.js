const express = require('express');
const router = express.Router();
const Usuarios = require('../model/usuario');
const token = require('../middlewares/token');
const auth = require('../middlewares/auth');
var HttpStatus = require('http-status-codes');

router.get('/', auth, async (req, res) => {
    try {
        return res.send(await Usuarios.find({}));
    } catch( err ) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Erro na consulta de usuários.' });
    }
});

router.post('/', async (req, res) => {
    const { email, senha } = req.body;
    if(!email || !senha) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Dados insuficientes' });

    try {
        if(await Usuarios.findOne({email})) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Usuários já registrado.' });
        const usuario = await Usuarios.create(req.body);
        usuario.senha = undefined;
        return res.status(HttpStatus.CREATED).send({ usuario, token: token(usuario.id) });
    } catch( err ) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Erro na criação de usuário.' });
    }
});

module.exports = router;