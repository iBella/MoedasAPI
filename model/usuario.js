const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const usuarioSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    senha: { type: String, required: true, select: true },
    moedaTotal: { type: Number, default: 0 },
    moedaTotalMes: { type: Number, default: 10 },
    dataCriacao: { type: Date, default: Date.now }
});

usuarioSchema.pre('save', function(next){
    let usuario = this;
    if(!usuario.isModified('senha')) return next();

    bcrypt.hash(usuario.senha, 10, (err, encrypted) => {
        usuario.senha = encrypted;
        return next();
    });
});

module.exports = mongoose.model('Usuario', usuarioSchema);