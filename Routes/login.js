const express = require('express');
const app = express();

// Herramienta para encriptar la constaseña
const bcrypt = require('bcryptjs');

// Herramienta para validación del jwt generado en el login
const jwt = require('jsonwebtoken');

// Modelo de datos
const Usuario = require('../Models/usuario');

// La semilla que autentica si el token es original
const SEED = require('../Config/config').SEED;

// GOOGLE
const CLIENT_ID = require('../Config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);


// =====================================================
// Login de Google
// =====================================================
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
        /* payload: payload */
    }
}

app.post('/google', async(req, res) => {

    var token = req.body.token;

    try {
        var googleUser = await verify(token);
    } catch (error) {
        return res.status(403).json({
            ok: false,
            mensaje: 'Token no válido',
            errors: error
        });
    }

    Usuario.findOne({ email: googleUser.email }, (err, usuario) => {

        /* if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con el email: ' + googleUser.email,
                errors: err
            });
        } */
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (usuario) {
            if (usuario.google === false) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Debe de usar su atenticación normal',
                });
            } else {
                // Crear un TOKEN
                const token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 });

                res.status(200).json({
                    ok: true,
                    usuario: usuario,
                    token: token,
                    id: usuario.id
                });
            }
        } else {
            // El usuario no existe, hay que crearlo
            var nuevoUsuario = new Usuario({
                nombre: googleUser.nombre,
                email: googleUser.email,
                password: ':)',
                img: googleUser.img,
                google: true
            });

            nuevoUsuario.save((err, usuarioCreado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al crear usuario',
                        errors: err
                    });
                }

                // Crear un TOKEN
                const token = jwt.sign({ usuario: usuarioCreado }, SEED, { expiresIn: 14400 });

                res.status(200).json({
                    ok: true,
                    usuario: usuarioCreado,
                    token: token,
                    id: usuarioCreado.id
                });
            });
        }
    });

    /* res.status(200).json({
        ok: true,
        mensaje: 'OK!!!!',
        googleUser: googleUser
    }); */


});

// =====================================================
// Login de la aplicación
// =====================================================
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        usuario.password = 'X'
            // Crear un TOKEN
        const token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 });

        res.status(200).json({
            ok: true,
            usuario: usuario,
            token: token,
            id: usuario.id
        });
    });
});





module.exports = app;