const constructionError = (res, status, msg ) => {

    return res.status(status).json({
        ok : false,
        msg
    });

}

module.exports = {
    constructionError,
}