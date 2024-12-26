//acciones de pruebas 
const publication = (req, res) => {
    return res.status(200).send({
        message: "mensaje enviado desde:controller/user.js"
    })
}



//exportar acciones 
module.exports = {
    publication
}