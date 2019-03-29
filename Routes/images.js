const express = require('express');
const app = express();

// Herramienta integreda en node para creación de rutas
const path = require('path');

// Herramienta para manipular archivos
const fileSystem = require('fs');

app.get('/:tipo/:img', (req, res) => {

    const tipo = req.params.tipo;
    const img = req.params.img;

    // Comprobar si las el tipo es de una colección disponible
    const tiposValidos = ['usuarios', 'medicos', 'hospitales'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no válida',
            errors: { mensaje: 'Tipo de colección no válida' }
        });
    }
    // ruta dinámica del archivo (Sin importar la ubicación del servidor)
    var pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);

    if (fileSystem.existsSync(pathImagen)) {
        res.sendFile(pathImagen)
    } else {
        var pathNoImage = path.resolve(__dirname, `../Assets/no-img.jpg`);
        res.sendFile(pathNoImage);
    }

});

module.exports = app;