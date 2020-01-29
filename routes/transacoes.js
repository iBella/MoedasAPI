const express = require('express');
const router = express.Router();
const Transacoes = require('../model/transacao');
const Usuarios = require('../model/usuario');

router.get('/', (req, res) => {
    Transacoes.find({}, (err, data) => {
        if(err) return res.send({ error: 'Erro na consulta de transações.' });
        return res.send(data);
    });
});

router.get('/emitidas/:email', (req, res) => {
    Transacoes.find({emailEmissor: req.params.email}, (err, data) => {
        if(err) return res.send({ error: 'Erro na consulta de transações.' });
        return res.send(data);
    });
});

router.get('/recebidas/:email', (req, res) => {
    Transacoes.find({emailDestinatario: req.params.email}, (err, data) => {
        if(err) return res.send({ error: 'Erro na consulta de transações.' });
        return res.send(data);
    });
});

router.post('/', (req, res) => {
    const { emailEmissor, emailDestinatario, motivo, quantidade } = req.body;
    if(!emailEmissor || !emailDestinatario || !motivo || !quantidade) return res.send({error: 'Dados insuficientes' });
    if(emailEmissor == emailDestinatario) return res.send({error: 'Operação não permitida.' });

    Usuarios.findOne({email: emailEmissor}, (err, dataEmissor) => {
        if(err) return res.send({ error: 'Erro ao consultar usuário Emissor.' });
        if(!dataEmissor) return res.send({ mensagem: 'Emissor não é mais um contribuidor.' });

        if(dataEmissor.moedaTotalMes > 0 && dataEmissor.moedaTotalMes >= quantidade){    
            Usuarios.findOne({email: emailDestinatario}, (err, dataDestinatario) => {
                if(err) return res.send({ error: 'Erro ao consultar usuário destinatario.' });
                if(!dataDestinatario) return res.send({ mensagem: 'Destinatário não é mais um contribuidor.' });

                Transacoes.create(req.body, (err, dataTransacao) => {
                    if(err) return res.send({ error: 'Erro ao criar transação.' });

                    dataEmissor.moedaTotalMes -= quantidade;
                    Usuarios.updateOne({email: emailEmissor}, dataEmissor, (err, data) => {
                        if(err) return res.send({ error: 'Erro ao atualizar moedas usuário emissor.' });
                    });
                    
                    dataDestinatario.moedaTotal += quantidade;
                    dataDestinatario.motivo = motivo;
                    Usuarios.updateOne({email: emailDestinatario}, dataDestinatario, (err, data) => {
                        if(err) return res.send({ error: 'Erro ao atualizar moedas usuário destinatario.' });
                    });

                    return res.send(dataTransacao);
                });
            });
        }
        else{
            return res.send({mensagem: 'Emissor não tem saldo suficiente.' });
        }
    });
});

module.exports = router;