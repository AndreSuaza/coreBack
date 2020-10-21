/*
 Router: /api/rols
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getRols, createRol } = require('../controllers/rols');
const { validateFields } = require('../middlewares/validate-fields');
const validateJwt = require('../middlewares/validate-jwt');
const { validateJWT } = require('../middlewares/validate-jwt');


const router =  Router();

router.get('/', getRols );

router.post(
    '/', 
    [
        validateJWT,
        check('name','username is required').not().isEmpty(),
        validateFields,
    ] ,
    createRol );

module.exports = router;