/*
 Router: /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createtUsers, updateUsers, deleteUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const validateJwt = require('../middlewares/validate-jwt');
const { validateJWT } = require('../middlewares/validate-jwt');


const router =  Router();

router.get('/', validateJWT ,getUsers );

router.post(
    '/', 
    [
        check('name','name is required').not().isEmpty(),
        check('password', 'password is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        validateFields,
    ] ,
    createtUsers );

router.put(
    '/:uid',
    [
        validateJWT,
        check('name','name is required').not().isEmpty(),
        check('role', 'role is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
    ] ,
    updateUsers );

router.delete(
    '/:uid',
    validateJWT,
    deleteUser );

module.exports = router;