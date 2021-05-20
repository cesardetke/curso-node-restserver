const { request, response } = require('express');



const usuariosGet = ( req = request, res = response ) => {

    const { id = "0", page = "1", limit, apikey} = req.query


    res.json({
        ok: true,
        msg: 'Hello Getoo',
        id,
        page,
        limit,
        apikey
    });
}

 const usuariosPut =  ( req, res = response ) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'Hello Putoo',
        id
    });
}

const usuariosPost = ( req, res = response ) => {

    const { nombre, fechaNacimiento} = req.body;
    res.status(201).json({
        ok: true,
        msg: 'Hello Postoo',
        nombre,
        fechaNacimiento
    });
}

const usuariosPatch = ( req, res = response ) => {
    res.status(500).json({
        ok: true,
        msg: 'Hello patchoo'
    });
}

const usuariosDelete = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Hello deletoo'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}