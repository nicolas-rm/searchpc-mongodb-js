const express = require('express');
const app = express();

// Herramienta para carga de archivos
const fileUpload = require('express-fileupload');

// Herramienta para manipular archivos
const fileSystem = require('fs');

// Modelos de datos
const Usuario = require('../Models/usuario');
const Medico = require('../Models/medico');
const Hospital = require('../Models/hospital');

// Middlewar - Opciones por fefault (Permite leer archivos en las peticiones Http)
app.use(fileUpload());



// =====================================================
// MODIFICAR el campo imagen de un registro de una colección
// =====================================================
app.put('/:tipo/:id', (req, res) => {

    // Se pide por la URL la información de la colección y el id 
    var tipo = req.params.tipo;
    var id = req.params.id;

    // Comprobar si las el tipo es de una colección disponible
    const tiposValidos = ['usuarios', 'medicos', 'hospitales'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no válida',
            errors: { mensaje: 'Tipo de colección no válida:' }
        });
    }

    // Si la petición no va cargada con un archivo en su cuerpo, manda un error
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No seleccinó nada',
            errors: { mensaje: 'Debe seleccionar una imagen' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.imagen;

    // Extraer extension
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Extensiones válidas
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    // Validar si el archivo tiene extension válida
    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: { mensaje: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
    }

    // Crear nombre del archivo personalizado
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

    // Mover el archivo del temporal a una ruta específica
    var path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        // Asignar archivo al registro correspondiente
        subirPorTipo(tipo, id, nombreArchivo, path, res);


    });


});



// =====================================================
// Función para cargar imagen
// =====================================================
function subirPorTipo(tipo, id, nombreArchivo, path, res) {

    switch (tipo) {
        case 'usuarios':
            //Buscar si el registro exite
            Usuario.findById(id, (err, usuario) => {

                if (!usuario) {
                    // Borra el archivo recien cargado
                    fileSystem.unlinkSync(path);
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El usuario con el id ' + id + ', no existe',
                        errors: { message: 'No existe un usuario con ese ID' }
                    });
                }

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar usuario',
                        errors: err
                    });
                }

                // Obteniendo la ruta de la imagen almacenada
                var pathViejo = './uploads/usuarios/' + usuario.img;
                // Si existe una imagen la elimina
                if (fileSystem.existsSync(pathViejo)) {
                    fileSystem.unlinkSync(pathViejo);
                }

                // Se asigna el nuevo nombre de archivo a su campo
                usuario.img = nombreArchivo;

                usuario.save((err, usuarioActualizado) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensage: 'Error al modificar el usuario',
                            errors: err
                        });
                    }

                    usuarioActualizado.password = '';

                    return res.status(200).json({
                        ok: true,
                        mensage: 'Usuario actualizado',
                        usuarioActualizado: usuarioActualizado
                    });
                });
            });
            break;

        case 'medicos':
            Medico.findById(id, (err, medico) => {
                if (!medico) {
                    // Borra el archivo recien cargado
                    fileSystem.unlinkSync(path);
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El médico con el id ' + id + ', no existe',
                        errors: { message: 'No existe un médico con ese ID' }
                    });
                }

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar medico',
                        errors: err
                    });
                }

                // Obteniendo la ruta de la imagen almacenada
                var pathViejo = './uploads/medicos/' + medico.img;

                // Si existe una imagen la elimina
                if (fileSystem.existsSync(pathViejo)) {
                    fileSystem.unlinkSync(pathViejo);
                }

                medico.img = nombreArchivo;

                medico.save((err, medicoModificado) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al cargar medico',
                            errors: err
                        });
                    }

                    return res.status(200).json({
                        ok: true,
                        medicoModificado: medicoModificado
                    });
                });
            });
            break;

        case 'hospitales':
            Hospital.findById(id, (err, hospital) => {
                if (!hospital) {
                    // Borra el archivo recien cargado
                    fileSystem.unlinkSync(path);
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El hospital con el id ' + id + ', no existe',
                        errors: { message: 'No existe un hospital con ese ID' }
                    });
                }

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar hospital',
                        errors: err
                    });
                }

                // Obteniendo la ruta de la imagen almacenada
                var pathViejo = './uploads/hospitales/' + hospital.img;

                if (fileSystem.existsSync(pathViejo)) {
                    fileSystem.unlinkSync(pathViejo);
                }

                hospital.save((err, hospitalModificado) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            errors: err
                        });
                    }

                    return res.status(200).json({
                        ok: true,
                        hospitalModificado: hospitalModificado
                    });
                });
            });
            break;
    }
}

module.exports = app;