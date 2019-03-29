const express = require('express');
const app = express();

// Herramienta para encriptar la constaseña
const bcrypt = require('bcryptjs');

// Clase del tipo de dato con el esquema
const Usuario = require('../Models/usuario');

// Middleware perzonalizado que verifica la autenticidad del jwt
const mdAutenticacion = require('../Middlewares/autenticacion');

// =====================================================
// Obtener todos los usuarios
// =====================================================
app.get('/', (req, response, next) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email img role')
        .skip(desde)
        .limit(5)
        .exec((err, usuarios) => {
            if (err) {
                return response.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar usuarios',
                    errors: err
                });
            }

            Usuario.countDocuments({}, (err, conteo) => {
                if (err) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar usuarios',
                        errors: err
                    });
                }

                response.status(200).json({
                    ok: true,
                    usuarios: usuarios,
                    total: conteo
                });
            });

        });
});


// =====================================================
// Crear un nuevo usuario
// =====================================================
app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        // Encriptando la constraseña para nunca almacenarla
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuarios',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });

    });
});


// =====================================================
// Modificar un usuario
// =====================================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }


        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioModificado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioModificado.password = '';

            res.status(200).json({
                ok: true,
                usuario: usuarioModificado
            });
        });
    });
});



// =====================================================
// Eliminar un usuario por id
// =====================================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    const id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {
        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        });

    });
});




module.exports = app;