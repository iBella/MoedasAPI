const express = require('express');
const router = express.Router();
const Usuarios = require('../model/usuario');

router.get('/', (req, res) => {
    Usuarios.find({}, (err, data) => {
        if(err) return res.send({ error: 'Erro na consulta de usuários.' });
        return res.send(data);
    });
});

router.post('/', (req, res) => {
    const { email, senha } = req.body;
    if(!email || !senha) return res.send({error: 'Dados insuficientes' });

    Usuarios.findOne({email}, (err, data) => {
        if(err) return res.send({ error: 'Erro ao consultar usuários.' });
        if(data) return res.send({ error: 'Usuários já registrado.' });

        Usuarios.create(req.body, (err, data) => {
            if(err) return res.send({ error: 'Erro ao criar usuários.' });
            return res.send(data);
        });
    });
});

module.exports = router;