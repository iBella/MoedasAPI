const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({mensagem: 'Método GET do index ok.'});
});

module.exports = router;