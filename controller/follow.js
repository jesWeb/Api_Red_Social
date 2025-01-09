const Follow = require("../models/follow");
const user = require("../models/user");

//acciones de pruebas 
const prueba_follow = (req, res) => {
    return res.status(200).send({
        message: "mensaje enviado desde:controller/follow.js"
    })
}


//guardar un follow (accion de seguri)

const save = (req, res) => {

    // datos body 



    //sacar el id del usuario  identificado 

    // crear objet con el modelo follow 

    // guardar objteo  en db 




    return res.status(200).send({
        message: "conectado",
        identity: req.user
    })
};


//accion de borrar  un follow (accion de seguir)
//accion de listado de usuarios que estoy siguiendo 
//acco=ion  de listado de ususarios que me siguen 



//exportar acciones 
module.exports = {
    prueba_follow,
    save
}