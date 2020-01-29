const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transacaoSchema = new Schema({
    emailDoador: { type: String, required: true, lowercase: true },
    emailGanhador: { type: String, required: true, lowercase: true },
    motivo: { type: String, required: true, max: 200 },
    quantidade: { type: Number, required: true, min: 1, max: 10 },
    dataDoacao: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transacao', transacaoSchema);