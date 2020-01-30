const express = require('express');
const router = express.Router();
const Usuarios = require('../model/usuario');
const token = require('../middlewares/token');
const auth = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
    try {
        return res.send(await Usuarios.find({}));
    } catch( err ) {
        return res.send({ error: 'Erro na consulta de usuários.' });
    }
});

router.post('/', async (req, res) => {
    const { email, senha } = req.body;
    if(!email || !senha) return res.send({ error: 'Dados insuficientes' });

    try {
        if(await Usuarios.findOne({email})) return res.send({ error: 'Usuários já registrado.' });
        const usuario = await Usuarios.create(req.body);
        usuario.senha = undefined;
        return res.send({ usuario, token: token(usuario.id) });
    } catch( err ) {
        return res.send({ error: 'Erro na criação de usuário.' });
    }
});

module.exports = router;