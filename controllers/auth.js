
const { response } = require('express');
const user = require('../models/user');
const { constructionError } = require('../helpers/errors');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        const userDB = await user.findOne({ email });


        //Vericar Email
        if(!userDB) {
            return constructionError(res, 400, "invalid password or email");
        }

        //Verificar Password

        const validPassword = bcrypt.compareSync( password, userDB.password );

        if(!validPassword) {
            return constructionError(res, 400, "invalid password or email");
        }

        //Generar Token 
        const token = await generateJWT( userDB.id );

        res.status(200).json({
            ok : true,
            msg : token
        });
        
    } catch (error) {
        res.status(500).json({
            ok : false,
            msg : "Error de autenticacion"
        });
    }
}

module.exports = {
    login
}