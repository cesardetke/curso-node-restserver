const Role = require('../models/Role');
const Usuario = require('../models/usuario');

// Verificar ROl
const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if ( !existeRol ){
        throw new Error(`No existe el rol ${ rol }`);
    }
}

  //Verificar Mail

const existeEmail = async (email = '') => {

    const existeEmail = await Usuario.findOne({ email });
    if ( existeEmail ){
        throw new Error(`El email ${ email } ya se encuenta registrado`);      
    }
}

  //Verificar Usuario

  const existeUsuarioPorId = async ( id ) => {

    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario){
        throw new Error(`El id ${ id } no existe`);      
    }
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}