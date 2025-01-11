//exportsar modelo 
const Publication = require("../models/publication");

//acciones de pruebas 
const publication = (req, res) => {
    return res.status(200).send({
        message: "mensaje enviado desde:controller/user.js"
    })
}

//guardar publicatio 

const save = (res, req) => {
    ///recoger datos    
    const params = req.body;

    // si no llegan respuesta negativa 
    if (!params.text) {
        return res.status(400).send({
            status: "error",
            mensage: "debes enviar la infomracion"
        })
    }
    //crear y rellenaer el objeto del modelo 
    let newPublication = new publication(params);
    newPublication.user = req.params.id
    //guardaf objeto en la base deddatos
    newPublication.save();


    return res.status(200).send({
        status: "success",
        message: "conectado",
        newPublication
    })
}



//sacra una publi
const mostar = (res, req) => {
    //sacare id publicacion url 
    const publicationId = req.params.id;

    //find con la condicion del id 
    Publication.findById(publicationId, (error, publicationStored) => {

        if (error || !publicationStored) {
            return res.status(404).send({
                status: "error",
                message: "no existe la publicacion"
            })
        }

        //respuesta
        return res.status(200).send({
            status: "success",
            message: "conectado",
            publication: publicationStored
        })
    });


};

//eliminar
const remove = (res, req) => {

    //id de la publicacon 
    const publicationId = req.params.id;
    //find y luego un remove 
    Publication.find({
        "user": req.user.id,
        "_id": publicationId
    }).remove((error => {
        if (error) {
            //devolver respuesta 
            return res.status(500).send({
                status: "error",
                message: "conectado",
            })
        }
        //devolver respuesta 
        return res.status(200).send({
            status: "success",
            message: "conectado",
            publicationId
        })
    }));


}

//listar la public

const user = (req, res) => {

    const userId = req.params.id;

    let page = 1;

    if (req.params.page) {
        page = req.params.page
    }

    const itemspage = 5;

    Publication.find({
        "user": userId
    }).exec((err, publications) => {
        return res.status(200).send({
            status: "success",
            message: "publicaciones del perofil del un usuario",
            user: req.user
        })
    })

    

}


/// listar publicaciones del usuario 

///subir ficheros

//devolver 



//exportar acciones 
module.exports = {
    publication,
    save,
    mostar,
    remove,
    user
}