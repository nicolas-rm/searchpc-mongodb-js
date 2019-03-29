const jwt = require('jsonwebtoken');
const SEED = require('../Config/config').SEED;


// =====================================================
// Verificar token - Middleware
// (se detalla antes del uso de los métodos 
// que necesiten autenticación)
// =====================================================

exports.verificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no válido',
                errors: err
            });
        }


        // Devolver en la URL la información del usuario que pasó por la verificación
        req.usuario = decoded.usuario;


        next()


    });

}