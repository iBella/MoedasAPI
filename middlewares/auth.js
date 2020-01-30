const jwt = require('jsonwebtoken');
var HttpStatus = require('http-status-codes');

const auth = (req, res, next) => {
    const token_header = req.headers.token;
    if(!token_header) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'Token não enviado.' });

    jwt.verify(token_header, 'senhatoken', (err, decoded) => {
        if(err) return res.status(HttpStatus.UNAUTHORIZED).send({ error: 'Token inválido.' });
        res.locals.authUsuario = decoded;
        return next();
    });
}

module.exports = auth;