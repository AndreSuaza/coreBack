const User = require('../models/user');
const { constructionError } = require('../helpers/errors');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async(req, res) => {

    const users = await User.find({}, 'name email rol google');

    res.json({
        ok: true,
        users
    });

};  

const createtUsers = async(req, res = response) => {

    const { password, email } = req.body;

    try {

        const existEmail = await User.findOne({email});

        if(existEmail) {
            return constructionError(res, 400, "El correo ya esta registrado");
        }

        const user = new User ( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        //Guardar usuario
        await user.save();

        const token = await generateJWT( user.uid );
        
        res.json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        
        res.status(500).json({
            ok : false,
            msg : "Error inesperado revisar logs"
        });
    }

};  


const updateUsers = async(req, res = response) => {

    const uid = req.params.uid;
    try {

        const user = await User.findById(uid);

        if(!user) {
            return constructionError(res, 404, "El usuario no existe");
        }

        //TODO: Validar toquen y comprobar si es el usuario correcto
        const { password, google, email, ...fields} = req.body;

        if( user.email !== email ) {
            const existEmail = await User.findOne({ email: email });
            if(existEmail) {
                return constructionError(res, 400, 'Ya existe un usuario con ese email');
            }
        }
        
        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate( uid, fields, { new: true} );

        res.json({
            ok: true,
            user: updatedUser
        });
        
    } catch (error) {
       
        res.status(500).json({
            ok : false,
            msg : "Error inesperado revisar logs"
        });
    }
   
};    

const deleteUser = async(req, res = response) => {

    const uid = req.params.uid;

    try {

        const user = await User.findById(uid);

        if(!user) {
            return constructionError(res, 404, "El usuario no existe");
        }

        await User.findByIdAndDelete(uid);

            
        res.status(200).json({
            ok : true,
            msg : 'Usuario Eliminado'
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
    createtUsers,
    updateUsers,
    deleteUser,
}