const express = require('express');
const router = express.Router();
const Transacoes = require('../model/transacao');
const Usuarios = require('../model/usuario');
const auth = require('../middlewares/auth');

router.get('/', auth, async (req, res) => {
    try {
        return res.send(await Transacoes.find({}));
    } catch( err ) {
        return res.send({ error: 'Erro na consulta de transações.' });
    }
});

router.get('/emitidas', auth, async (req, res) => {
    try {
        const usuarioLogado = await Usuarios.findById(res.locals.authUsuario.id);
        return res.send(await Transacoes.find({ emailEmissor: usuarioLogado.email }));
    } catch( err ) {
        return res.send({ error: 'Erro na consulta as transações emitidas do usuário logado.' });
    }
});

router.get('/recebidas', auth, async (req, res) => {
    try {
        const usuarioLogado = await Usuarios.findById(res.locals.authUsuario.id);
        return res.send(await Transacoes.find({ emailDestinatario: usuarioLogado.email }));
    } catch( err ) {
        return res.send({ error: 'Erro na consulta as transações recebidas do usuário logado.' });
    }
});

router.get('/emitidas/:email', auth, async (req, res) => {
    try {
        return res.send(await Transacoes.find({emailEmissor: req.params.email}));
    } catch( err ) {
        return res.send({ error: 'Erro na consulta de transações emitidas do usuário de email.' });
    }
});

router.get('/recebidas/:email', auth, async (req, res) => {
    try {
        return res.send(await Transacoes.find({emailDestinatario: req.params.email}));
    } catch( err ) {
        return res.send({ error: 'Erro na consulta de transações recebidas do usuário de email.' });
    }
});

router.post('/', auth, async (req, res) => {
    const { emailEmissor, emailDestinatario, motivo, quantidade } = req.body;
    if(!emailDestinatario || !motivo || !quantidade) return res.send({ error: 'Dados insuficientes' });

    var usuarioEmissor;
    if(!emailEmissor) {
        usuarioEmissor = await Usuarios.findById(res.locals.authUsuario.id);
    } else {
        usuarioEmissor = await Usuarios.findOne({email: emailEmissor});
        if(!usuarioEmissor) return res.send({ error: 'Emissor não é mais um contribuidor.' });
    }

    if(usuarioEmissor.email == emailDestinatario) return res.send({ error: 'Operação não permitida.' });

    try {
        const usuarioDestinatario = await Usuarios.findOne({email: emailDestinatario});
        if(!usuarioDestinatario) return res.send({ error: 'Destinatario não é mais um contribuidor.' });

        if(usuarioEmissor.moedaTotalMes > 0 && usuarioEmissor.moedaTotalMes >= quantidade){
            const transacao = await Transacoes.create(req.body);
            
            usuarioEmissor.moedaTotalMes -= quantidade;
            await Usuarios.updateOne({email: usuarioEmissor.email}, usuarioEmissor);
            
            usuarioDestinatario.moedaTotal += quantidade;
            usuarioDestinatario.motivo = motivo;
            await Usuarios.updateOne({email: emailDestinatario}, usuarioDestinatario);

            return res.send(transacao);
        }
        return res.send({mensagem: 'Emissor não tem saldo suficiente.' });
    } catch( err ) {
        return res.send({ error: 'Erro na transação.' });
    }
});

module.exports = router;