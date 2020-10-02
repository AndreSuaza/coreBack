const { constructionError } = require('../helpers/errors');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    const token = req.header('x-token')

    if ( !token ) {
        return constructionError(res, 401, 'Unauthorized missing token')
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();

    } catch (error) {
        res.status(401).json({
            ok : false,
            msg : "Invalid Token"
        });
    }
    
}

module.exports = {
    validateJWT
}