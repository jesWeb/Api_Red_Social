const follow = require("../models/follow");
const user = require("../models/user");

//dependencias 
const mongoosePaginate = require("mongoose-pagination");

//importar se3rvicios 
const followServ = require("../services/followUserIds");

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


const following = (req, res) => {

    try {

        //sacar el id del usuario 
        let userId = req.user.id;
        //comprobar si llega el id por paramentro url 
        if (req.params.id) {
            userId = req.params.id;
        }
        //si llega la pagina si no la pagina 1
        let page = 1;
        if (req.params.page) {
            page = req.parama.page;
        }
        //usuarios por pagina quiero mostrar
        const itemsPage = 5;

        //find de follow , popupale datos de los usuarios y paginar con moongose
        follow.find({
                user: userId
            }).populate("user followed", "-password -role -__v")
            .paginate(page, itemsPage, (error, follows, total) => {


                //listado de usuarios de usuario 
                //sacar un array de  ids de los usuarios que me siguen y los que sigo como jesus 
                let followUserIds = followServ.followUserIds(req.user.id);




                return status(200).send({
                    status: 'success',
                    menssage: "Listado de usuarios que te siguen ",
                    follows,
                    total,
                    pages: Math.ceil(total / itemsPage),
                    user_following: followUserIds.following,
                    user_followme: followUserIds.followers

                })
            })

    } catch (error) {

    }

}


//acco=ion  de listado de ususarios que me siguen 
const followers = (req, res) => {
    try {

        //sacar el id del usuario 
        let userId = req.user.id;
        //comprobar si llega el id por paramentro url 
        if (req.params.id) {
            userId = req.params.id;
        }
        //si llega la pagina si no la pagina 1
        let page = 1;
        if (req.params.page) {
            page = req.parama.page;
        }
        //usuarios por pagina quiero mostrar
        const itemsPage = 5;

        //find de follow , popupale datos de los usuarios y paginar con moongose
        follow.find({
                followed: userId
            }).populate("user followed", "-password -role -__v")
            .paginate(page, itemsPage, async (error, follows, total) => {
               
                let followUserIds = followServ.followUserIds(req.user.id);
                return status(200).send({
                    status: 'success',
                    menssage: "Listado de usuarios que te siguen ",
                    follows,
                    total,
                    pages: Math.ceil(total / itemsPage),
                    user_following: followUserIds.following,
                    user_followme: followUserIds.followers

                })
            })


        return res.status(200).send({
            message: "listado de usuarios a quin me sigo .",
            status: "success",
        });
    } catch (error) {

    }
}


//exportar acciones 
module.exports = {
    prueba_follow,
    save,
    unfollow,
    following,
    followers
}