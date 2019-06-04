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
    values: ['S-VIDEO', 'VGA', 'MINI_VGA', 'HDMI', 'DISPLAY_PORT', 'MINI_DISPLAY_PORT'],
    mensaje: '{VALUE} no es una marca permitida'
};

var sistemas = {
    values: ['WINDOWS10PRO', 'WINDOWS10HOME', 'WINDOWS10SL', 'DISTLINUX', 'MACOSX', 'MACOSC'],
    mensaje: '{VALUE} no es una sistema permitido'
};

const computadoraSchema = new Schema({

    /**ESTRUCTURA DE LA BASE DE DATOS */


    marca: {
        type: String,
        uppercase: true,
        required: [true, 'LA MARCA ES REQUERIDO']
    },

    modelo: {
        type: String,
        uppercase: true,
        required: [true, 'EL MODELO ES REQUERIDO']
    },
    precio: {
        type: Number,
        uppercase: true,
        required: [true, 'EL PRECIO CPU ES REQUERIDO']
    },

    color: {
        type: String,
        uppercase: true,
        required: [true, 'EL COLOR ES REQUERIDO']
    },

    almacenamiento: {
        type: String,
        uppercase: true,
        required: [true, 'LA CANTIDAD DE ALMACENAMIENTO ES REQUERIDO']
    },

    tipoAlmacenamineto: {
        type: String,
        uppercase: true,
        enum: tiposAlmacenaminetos,
        required: [true, 'EL TIPO DE ALMACENAMIENTO ES REQUERIDO']
    },

    ram: {
        type: String,
        uppercase: true,
        required: [true, 'LA MEMORIA RAM ES REQUERIDO']
    },

    velocidadCpu: {
        type: Number,
        uppercase: true,
        required: [true, 'LA VELOCIDAD CPU ES REQUERIDO']
    },

    marcaCpu: {
        type: String,
        uppercase: true,
        enum: tiposMarcaCpu,
        required: [true, 'LA MARCA CPU ES REQUERIDO']
    },

    lectorCD: {
        type: Boolean,
        uppercase: true,
        required: [true, 'LA ENTRADA CD ES REQUERIDO']
    },

    video: {
        type: [String],
        uppercase: true,
        enum: tiposVideo,
        required: [true, 'LA/S ENTRADA/S DE VIDEO ES REQUERIDO']
    },

    tajetaIntegrada: {
        type: Boolean,
        uppercase: true,
        required: [true, 'LA TARJETA INTEGRADA ES REQUERIDO']
    },

    tajetaDedicada: {
        type: Boolean,
        uppercase: true,
        required: [true, 'LA TARJETA DEDICADA ES REQUERIDO']
    },

    modeloTarjetaVideo: {
        type: String,
        uppercase: true,
        required: [true, 'EL MODELO DE LA TARJETA DE VIDEO ES REQUERIDO']
    },


    tamanoPantalla: {
        type: String,
        uppercase: true,
        required: [true, 'EL TAMAÑO DE LA PANTALLA ES REQUERIDO']
    },

    resolucion: {
        type: String,
        uppercase: true,
        required: [true, 'LA RESOLUCION ES REQUERIDO']
    },

    ancho: {
        type: String,
        uppercase: true,
        required: [true, 'EL ANCHO ES REQUERIDO']
    },

    alto: {
        type: String,
        uppercase: true,
        required: [true, 'EL ALTO ES REQUERIDO']
    },

    peso: {
        type: String,
        uppercase: true,
        required: [true, 'EL PESO ES REQUERIDO']
    },


    sistemaOperativo: {
        type: String,
        uppercase: true,
        enum: sistemas,
        required: [true, 'EL SISTEMA OPERATIVO ES REQUERIDO']
    },

    usb2: {
        type: String,
        uppercase: true,
        required: [true, 'EL USB2 ES REQUERIDO']
    },

    usb3: {
        type: String,
        uppercase: true,
        required: [true, 'EL USB3 ES REQUERIDO']
    },


    expansionRam: {
        type: Boolean,
        uppercase: true,
        required: [true, 'LA EXPANSION ES REQUERIDO']
    },
    // FALTA
    img: {
        type: String,
        // uppercase: true,
        required: [false, 'CAMPO IMAGEN']
    },
});



computadoraSchema.plugin(uniqueValidator, { mensaje: '{PATH} debe ser único' });


module.exports = mongoose.model('Computadora', computadoraSchema);