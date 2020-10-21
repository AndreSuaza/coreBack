const db = require('../models');
const Rol = db.rols;

const { response } = require('express');
const { constructionError } = require('../helpers/errors');


const getRols = async(req, res) => {

    try {
        const rols = await Rol.findAll();
        res.json({
            ok: true,
            rols
        });
    } catch (error) {
    console.log('Error', error) 
    res.status(500).json({
        ok : false,
        msg : "Error inesperado revisar logs"
    });
}

};  


const createRol = async(req, res = response) => {

    const { name } = req.body;
    
    try {
        
        const existRol = await Rol.findOne({ where: { name: name } });
    
        if(existRol) {
            return constructionError(res, 400, "El Rol ya esta registrado");
        }
        
        const rol =  req.body ;

        const resp = await Rol.create(rol);
        console.log(resp);
        res.json({
            ok: true,
            rol: resp.dataValues,
        });
        
    } catch (error) {
        console.log('Error', error) 
        res.status(500).json({
            ok : false,
            msg : "Error inesperado revisar logs"
        });
    }

};  


module.exports = {
    getRols,
    createRol
}