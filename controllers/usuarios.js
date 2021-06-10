const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');




const usuariosGet = async ( req = request, res = response ) => {

    //const { id = "0", page = "1", limit, apikey} = req.query
    const { limite = 5 , desde = 0} = req.query;
    const filtro = { estado : true }


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments( filtro ),
        Usuario.find( filtro )
            .skip( Number (desde) )
            .limit( Number(limite) )
    ]);


    res.json({ 
        total,
        usuarios
    });
}

 const usuariosPut =  async ( req, res = response ) => {

    const { id } = req.params;
    const { _id ,password, google, email, ...resto} = req.body;

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        msg: 'Hello Putoo',
        usuario
    });
}

const usuariosPost = async ( req, res = response ) => {



    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario( {nombre, email, rol} );

  

    //Encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar BD
    await usuario.save();

    res.status(201).json({
        ok: true,
        msg: 'Hello Postooo',
        usuario
    });
}

const usuariosPatch = ( req, res = response ) => {
    res.status(500).json({
        ok: true,
        msg: 'Hello patchoo'
    });
}

const usuariosDelete = async ( req, res = response ) => {

    const { id } = req.params

    // Borrado Fisico
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Borrado logico
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false});

    res.json({
        usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}