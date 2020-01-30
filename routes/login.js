const express = require('express');
const router = express.Router();
const Usuarios = require('../model/usuario');
const bcrypt = require('bcrypt');
const token = require('../middlewares/token');
var HttpStatus = require('http-status-codes');

router.post('/', async (req, res) => {
    const { email, senha } = req.body;
    if(!email || !senha) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Dados insuficientes' });

    try {
        const usuario = await Usuarios.findOne({email}).select('+senha');
        if(!usuario) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Usuários não registrado.' });
        
        const autenticado = await bcrypt.compare(senha, usuario.senha);
        if(!autenticado) return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Erro na autenticação do usuário.' });

        usuario.senha = undefined;
        return res.send({ usuario, token: token(usuario.id) });

    } catch( err ) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao autenticar usuário.' });
    }
});

module.exports = router;