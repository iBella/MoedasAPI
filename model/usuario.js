const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    senha: { type: String, required: true, select: true },
    moedaTotal: { type: Number, default: 0 },
    moedaTotalMes: { type: Number, default: 10 },
    dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema);