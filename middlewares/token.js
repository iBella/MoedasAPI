const jwt = require('jsonwebtoken');

const token = (usuarioId) => {
    return jwt.sign({ id: usuarioId }, 'senhatoken', { expiresIn: '7d' });
}

module.exports = token;