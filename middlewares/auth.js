//importar modulos 
const jwt = require("jwt-simple");
const moment = require("moment");

//importar clave secreta 
const libjwt = require('../services/jwt');
const KySecret = libjwt.KySecret;

//funcion de autenticacion  middlware
exports.auth = (req, res, next) => {

    //comprobar si llega la cabecera de auth 
    if (!req.headers.authorization) {
        return res.status(401).send({
            status: 'error',
            message: 'la petición no tiene la cabecera de autenticación'
        });
    }

    //limpiar el token y quitar comillas
    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {

        //decodificar el token 

        let payload = jwt.decode(token, KySecret);
        console.log(payload.exp);
        //comprobar si el token ha expirado 

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: 'error',
                message: 'el token ha expirado'
            });
        }
        //agregar datos al usuario o request 
        req.user = payload;



    } catch (error) {
        return res.status(404).send({
            status: error,
            menssage: 'token no valido',
            error
        })
    }
    //pasar a ejecucuin de accion 
    next();

}