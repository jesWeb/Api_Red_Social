// este archivo va crear el token jwt para cada usuario de acuerdo ala infomacion registrada

//dependencias 
const jwt = require('jwt-simple');
const moment = require('moment');

//crear clave secreta solo acceso a nosotros devs
const KySecret = "Puchy_Ap_2145";

//funcion para crear los tokens 
const createToken = (user) => {
    const payload = {
        //parametros de usuario 
        id: user._id,
        name: user.name,
        apellidos: user.apellidos,
        nickname: user.nickname,
        email: user.email,
        role: user.role,
        image: user.image,
         //parametros de creacion y expiracion 
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix

    };
    //rotrnar token 
    return jwt.encode(payload, KySecret)

}

module.exports = {
    createToken,
    KySecret
}