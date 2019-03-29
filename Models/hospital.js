const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Esquema en donde se hace referencia a otra colección
// La misma lógina que la relación con tablas para saber qué usuario lo creó
const hospitalSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'Se necesita la refencia del usuario'] },
    img: { type: String, required: false }
}, { collection: 'hospitales' });

module.exports = mongoose.model('Hospital', hospitalSchema);