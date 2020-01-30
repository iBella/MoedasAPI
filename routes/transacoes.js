const express = require('express');
const router = express.Router();
const Transacoes = require('../model/transacao');
const Usuarios = require('../model/usuario');

router.get('/', async (req, res) => {
    try {
        return res.send(await Transacoes.find({}));
    } catch( err ) {
        return res.send({ error: 'Erro na consulta de transações.' });
    }
});

router.get('/emitidas/:email', async (req, res) => {
    try {
        return res.send(await Transacoes.find({emailEmissor: req.params.email}));
    } catch( err ) {
        return res.send({ error: 'Erro na consulta de transações emitidas.' });
    }
});

router.get('/recebidas/:email', async (req, res) => {
    try {
        return res.send(await Transacoes.find({emailDestinatario: req.params.email}));
    } catch( err ) {
        return res.send({ error: 'Erro na consulta de transações recebidas.' });
    }
});

router.post('/', async (req, res) => {
    const { emailEmissor, emailDestinatario, motivo, quantidade } = req.body;
    if(!emailEmissor || !emailDestinatario || !motivo || !quantidade) return res.send({ error: 'Dados insuficientes' });
    if(emailEmissor == emailDestinatario) return res.send({ error: 'Operação não permitida.' });

    try {
        const usuarioEmissor = await Usuarios.findOne({email: emailEmissor});
        if(!usuarioEmissor) return res.send({ error: 'Emissor não é mais um contribuidor.' });

        const usuarioDestinatario = await Usuarios.findOne({email: emailDestinatario});
        if(!usuarioDestinatario) return res.send({ error: 'Destinatario não é mais um contribuidor.' });

        if(usuarioEmissor.moedaTotalMes > 0 && usuarioEmissor.moedaTotalMes >= quantidade){
            const transacao = await Transacoes.create(req.body);
            
            usuarioEmissor.moedaTotalMes -= quantidade;
            await Usuarios.updateOne({email: emailEmissor}, usuarioEmissor);
            
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