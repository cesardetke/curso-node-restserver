const { Router } = require('express');
const { check } = require('express-validator');


const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();



router.get('/', usuariosGet );
router.put('/:id',[
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut );
router.post('/', [
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('password', 'al contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'Dirección de correo invalida').isEmail(),
    check('email').custom( existeEmail ),
    //check('rol', 'rol invalido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPost );
router.patch('/', usuariosPatch );
router.delete('/:id',  [
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);



module.exports = router;