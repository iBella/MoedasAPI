const express = require('express');
const router = express.Router();
const Usuarios = require('../model/usuario');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
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
        return res.send(usuario);
    } catch( err ) {
        return res.send({ error: 'Erro na criação de usuário.' });
    }
});

router.post('/auth', async (req, res) => {
    const { email, senha } = req.body;
    if(!email || !senha) return res.send({ error: 'Dados insuficientes' });

    try {
        const usuario = await Usuarios.findOne({email}).select('+senha');
        if(!usuario) return res.send({ error: 'Usuários não registrado.' });
        
        const autenticado = await bcrypt.compare(senha, usuario.senha);
        if(!autenticado) return res.send({ error: 'Erro na autenticação do usuário.' });

        usuario.senha = undefined;
        return res.send(usuario);

    } catch( err ) {
        return res.send({ error: 'Erro ao autenticar usuário.' });
    }
});

module.exports = router;