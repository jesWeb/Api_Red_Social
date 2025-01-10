const follow = require("../models/follow");
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
    const params = req.body;
    //sacar el id del usuario  identificado 
    const identity = req.user;
    // crear objet con el modelo follow 
    let userToFollow = new follow({

        user: identity.id,
        followed: params.follow
    });
    userToFollow.user = identity.id;
    userToFollow.followed = params.followed;

    // guardar objteo  en db 
    userToFollow.save();

    return res.status(200).send({
        message: "conectado",
        identity: req.user,
        follow: userToFollow
    })

};


//accion de borrar  un follow (accion de seguir)

const unfollow = (req, res) => {
    // id del usuario que quiere dejar de seguir
    const userId = req.user.id;
    // id del usuario al que se quiere dejar de seguir
    const followedId = req.params.id;

    // Eliminar el registro de seguimiento
   const followDeleted = follow.deleteOne({
        "user": userId,
        "followed": followedId
    });

    

    if (followDeleted) {
        // Respuesta exitosa
        return res.status(200).send({
            message: "Borrado correctamente",
            followDeleted
        });
    } else {
        return res.status(500).send({
            message: "Error no has dejado seguir a alaguien.",
            status: "error",
        });
    }

};




//accion de listado de usuarios que estoy siguiendo 
//acco=ion  de listado de ususarios que me siguen 



//exportar acciones 
module.exports = {
    prueba_follow,
    save,
    unfollow
}