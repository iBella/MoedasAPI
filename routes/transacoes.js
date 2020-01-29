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

router.post('/', (req, res) => {
    const { emailDoador, emailGanhador, motivo, quantidade } = req.body;
    if(!emailDoador || !emailGanhador || !motivo || !quantidade) return res.send({error: 'Dados insuficientes' });
    if(emailDoador == emailGanhador) return res.send({error: 'Operação não permitida.' });

    Usuarios.findOne({email: emailDoador}, (err, dataDoador) => {
        if(err) return res.send({ error: 'Erro ao consultar usuário doador.' });
        if(dataDoador.moedaTotalMes > 0 && dataDoador.moedaTotalMes >= quantidade){    
            Usuarios.findOne({email: emailGanhador}, (err, dataGanhador) => {
                if(err) return res.send({ error: 'Erro ao consultar usuário ganhador.' });
                
                Transacoes.create(req.body, (err, dataTransicao) => {
                    if(err) return res.send({ error: 'Erro ao criar transação.' });

                    dataDoador.moedaTotalMes -= quantidade;
                    Usuarios.update({email: emailDoador}, dataDoador, (err, data) => {
                        if(err) return res.send({ error: 'Erro ao atualizar moedas usuário doador.' });
                    });
                    
                    dataGanhador.moedaTotal += quantidade;
                    dataGanhador.motivo = motivo;
                    Usuarios.update({email: emailGanhador}, dataGanhador, (err, data) => {
                        if(err) return res.send({ error: 'Erro ao atualizar moedas usuário ganhador.' });
                    });

                    return res.send(dataTransicao);
                });
            });
        }
        else{
            return res.send({mensagem: 'Doador não tem saldo suficiente.' });
        }
    });
});

module.exports = router;