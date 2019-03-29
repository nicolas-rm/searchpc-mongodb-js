// Se obtiene mongoose de las dependencias para realizar el esquema o modelo de datos
const mongoose = require('mongoose');

// Ayuda para campos únicos
const uniqueValidator = require('mongoose-unique-validator');

// Roles validos al crear un usuario
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

// Se crea el modelo o esqueda de datos con un nombre específico que tendrá la configuración
// del esquema que proporciona mongoose para conectarse con la base de datos de mongo
const usuarioSquema = mongoose.Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La constaseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, uppercase: true, default: 'USER_ROLE', enum: rolesValidos },
    google: { type: Boolean, default: false }
});
/*
 A diferencia de la configuración normal de esquemas, aquí se proporcionan características
 extra para el funcionamiento:

 Cada campo tendrá un objeto lleno de configuración que puede ser:
    1. type: tipo de dato
    2. unique: indicador que el valor debe ser único en la colección
    3. required: que especifica que no puede ser null
    4. default: para proporcionar un valor predeterminado si no se recibe un valor específico
    5. enum: para indicar el objeto de roles válidos
 */


// Indicando el mensaje específico segun el campo único
usuarioSquema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })

// Por último se exporta el archivo en forma de módulo, el cual contiene la información
// que apunta a la colección y el esquema especificado justo arriba 
module.exports = mongoose.model('Usuario', usuarioSquema);