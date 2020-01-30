const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_header = req.headers.token;
    if(!token_header) return res.send({ error: 'Token não enviado.' });

    jwt.verify(token_header, 'senhatoken', (err, decoded) => {
        if(err) return res.send({ error: 'Token inválido.' });
        res.locals.authUsuario = decoded;
        return next();
    });
}

module.exports = auth;