/*
 Router: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUsers, updateUsers } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const validateJwt = require('../middlewares/validate-jwt');
const { validateJWT } = require('../middlewares/validate-jwt');


const router =  Router();

router.get('/', getUsers );



router.post(
    '/', 
    [
        check('username','username is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        validateFields,
    ] ,
    createUsers );

router.put(
    '/:id',
    [
        validateJWT,
        check('username','name is required').not().isEmpty(),
        check('rol', 'role is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
    ] ,
    updateUsers );


module.exports = router;