const mongoose = require('mongoose');

const medicoSchema = mongoose.Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'El id del hospital es obligatorio'] },
    img: { type: String, required: false }
});


module.exports = mongoose.model('Medico', medicoSchema);