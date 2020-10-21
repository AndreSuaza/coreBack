const db = require('../models');
const bcrypt = require('bcryptjs');
const User = db.users;

const { response } = require('express');
const { constructionError } = require('../helpers/errors');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async(req, res) => {

    try {
        const users = await User.findAll();
        res.json({
            ok: true,
            users
        });
    } catch (error) {
    console.log('Error', error) 
    res.status(500).json({
        ok : false,
        msg : "Error inesperado revisar logs"
    });
}

};  


const createUsers = async(req, res = response) => {

    const { password, email } = req.body;
    
    try {
        
        const existEmail = await User.findOne({ where: { email: email } });
    
        if(existEmail) {
            return constructionError(res, 400, "El correo ya esta registrado");
        }
        
        const user =  req.body ;
 
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        //Guardar usuario
        const resp = await User.create(user);

        //Generar Token 
        const token = await generateJWT( resp.id );
  
        res.json({
            ok: true,
            user: {
                'id': resp.id,
                'username': resp.username,
                'email': resp.email
            },
            token
        });
        
    } catch (error) {
        console.log('Error', error) 
        res.status(500).json({
            ok : false,
            msg : "Error inesperado revisar logs"
        });
    }

};  

const updateUsers = async(req, res = response) => {

    const id = req.params.id;

    try {

        const user = await User.findByPk(id);

        if(!user) {
            return constructionError(res, 404, "El usuario no existe");
        }

        //TODO: Validar toquen y comprobar si es el usuario correcto
        const { password, email, ...fields} = req.body;
        
        if( user.email !== email ) {
            const existEmail = await User.findOne({ where: { email: email } });
            if(existEmail) {
                return constructionError(res, 400, 'Ya existe un usuario con ese email');
            }
        }
        
        fields.email = email;
        console.log('fields', fields, id);
        await User.update( 
            {
                'username': fields.username,
                'email': fields.email
            },
            {
                where: {
                    id: id
                  }
            }
        );

        res.json({
            ok: true,
        });
        
    } catch (error) {

        res.status(500).json({
            ok : false,
            msg : "Error inesperado revisar logs"
        });
    }
   
};    



module.exports = {
    getUsers,
    createUsers,
    updateUsers
}