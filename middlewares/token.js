const jwt = require('jsonwebtoken');
const config = require('../config/config');

const token = (usuarioId) => {
    return jwt.sign({ id: usuarioId }, config.jwt_senha, { expiresIn: config.jwt_tempo_token });
}

module.exports = token;