const express = require('express');
const routes = express();

const Computadora = require('../Models/computadora');


// =====================================================
// Obtener todas las computadoras
// =====================================================
routes.get('/', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Computadora.find({})
        .skip(desde)
        .limit(5)
        .exec((err, computadoras) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar computadoras',
                    errors: err
                });
            }

            Computadora.countDocuments({}, (err, conteo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar el total de computadoras',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    computadoras: computadoras,
                    total: conteo
                });
            });
        });
});

// =====================================================
// Obtener computadoras según alguritmo de predicción
// =====================================================
routes.post('/sugerencia', (req, res) => {

    let preferencias = req.body;
    /* 
        var ocupacion = preferencias.ocupacion;
        var horas = preferencias.horas;
        var presupuesto = preferencias.presupuesto;
        var edad = preferencias.edad;
        var nivelUso = preferencias.nivelUso;
        var marcaPreferencia = preferencias.marcaPreferencia;
        var color = preferencias.color;
        var almacenamiento = preferencias.almacenamiento; */
    // res.json({
    //     preferencias: preferencias
    // });


    console.log('MARCAS PREFERENCIAS : ' + preferencias.marcaPreferencia);
    // Conversiones de string a number (permiten el funcionamiento del algoritmo)
    // preferencias.presupuesto = parseFloat(preferencias.presupuesto);
    // --------------------
    Computadora.find({
        marca: { $in: preferencias.marcaPreferencia },
        precio: {
            $gte: (preferencias.presupuesto - 2000),
            $lte: (preferencias.presupuesto + 2000)
        }
        // marca: preferencias.marmarcaPreferencia
        // marca: { $in: (preferencias.marcaPreferencia[0]) },
        // marca: preferencias.marcaPreferencia || preferencias.marcaPreferencia[0],
        // color: { $in: (preferencias.color), $or: ('') }

    }).exec((err, computadoras) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cargar computadoras',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            computadoras: computadoras,
        });

    });

});

// =====================================================
// Inserta computadora
// =====================================================
routes.post('/', (req, res) => {
    let body = req.body;

    let computadora = new Computadora({
        marca: body.marca,
        modelo: body.modelo,
        precio: body.precio,
        color: body.color,
        almacenamiento: body.almacenamiento,
        tipoAlmacenamineto: body.tipoAlmacenamineto,
        ram: body.ram,
        velocidadCpu: body.velocidadCpu,
        marcaCpu: body.marcaCpu,
        lectorCD: body.lectorCD,
        video: body.video,
        tajetaIntegrada: body.tajetaIntegrada,
        tajetaDedicada: body.tajetaDedicada,
        modeloTarjetaVideo: body.modeloTarjetaVideo,
        tamanoPantalla: body.tamanoPantalla,
        resolucion: body.resolucion,
        ancho: body.ancho,
        alto: body.alto,
        peso: body.peso,
        sistemaOperativo: body.sistemaOperativo,
        usb2: body.usb2,
        usb3: body.usb3,
        expansionRam: body.expansionRam,
        img: body.img
    });

    computadora.save((err, computadoraGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear registro de computadora',
                error: err
            });
        }

        res.status(201).json({
            ok: true,
            computadora: computadoraGuardada
        });
    });
});
module.exports = routes;