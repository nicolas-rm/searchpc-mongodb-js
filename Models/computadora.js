const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

// Tipos de almacenamiento permitidos
var tiposAlmacenaminetos = {
    values: ['TERABYTE', 'GIGABYTE'],
    mensaje: '{VALUE} no es un tipo de almacenamineto permitido'
};
var tiposMarcaCpu = {
    values: ['AMD', 'INTEL'],
    mensaje: '{VALUE} no es una marca permitida'
};
var tiposVideo = {
    values: ['S-VIDEO', 'VGA','MINI_VGA','HDMI','DISPLAY_PORT','MINI_DISPLAY_PORT'],
    mensaje: '{VALUE} no es una marca permitida'
};
var sistemas = {
    values: ['WINDOWS10PRO', 'WINDOWS10HOME', 'WINDOWS10SL', 'DISTLINUX', 'MACOSX', 'MACOSC'],
    mensaje: '{VALUE} no es una sistema permitido'
};

const computadoraSchema = new Schema({
    marca: {
        type: String,
        required: [true, 'La marca es requrida']
    },
    modelo: {
        type: String,
        required: [true, 'El modelo es requrido']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es requrido']
    },
    color: {
        type: String,
        required: [true, 'El color es requrido']
    },
    almacenamiento: {
        type: String,
        required: [true, 'El almacenamiento es requrido']
    },
    tipoAlmacenamineto: {
        type: String,
        unique: true,
        required: [true, 'El almacenamiento es requrido']
    },
    ram: {
        type: String,
        required: [true, 'la ram es requrida']
    },
    
    velocidadCpu: {
        type: Number,
        required: [true, 'la velocidad del cpu es requrido']
    },
    
    marcaCpu: {
        type: String,
        unique: true,
        required: [true, 'El almacenamiento es requrido']
    },
    
    lectorCD: {
        type: Boolean,
        required: [true, 'La caracteristica es requerida']
    },
    
    video: {
        type: [String],
        required: [true, 'La caracteristica es requerida']
    },

    tajetaIntegrada: {
        type: Boolean,
        required: [true, 'La caracteristica es requerida']
    },

    tajetaDedicada: {
        type: Boolean,
        required: [true, 'La caracteristica es requerida']
    },

    modeloTarjetaVideo: {
        type: String,
        required: [true, 'El modelo de la tarjeta es requrido']
    },
    
    tamañoPantalla: {
        type: String,
        required: [true, 'La caracteristica es requerida']
    },
    
    resolucion: {
        type: String,
        required: [true, 'La caracteristica es requerida']
    },

    ancho: {
        type: String,
        required: [true, 'La caracteristica es requerida']
    },

    alto: {
        type: String,
        required: [true, 'La caracteristica es requerida']
    },

    peso: {
        type: String,
        required: [true, 'La caracteristica es requerida']
    },

    sistemaOperativo: {
        type: String,
        required: [true, 'La caracteristica es requerida']
    },

    usb2: {
        type: String,
        required: [true, 'La caracteristica es requerida']
    },

    usb3: {
        type: String,
        required: [true, 'La caracteristica es requerida']
    },

    expansionRam: {
        type: Boolean,
        required: [true, 'La caracteristica es requerida']
    },

    img: {
        type: String,
        required: [true, 'La caracteristica es requerida']
    },
});



computadoraSchema.plugin(uniqueValidator, { mensaje: '{PATH} debe ser único'});


module.exports = mongoose.model('Computadora', computadoraSchema);