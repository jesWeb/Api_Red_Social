//acciones de pruebas 
const prueba_follow = (req, res) => {
    return res.status(200).send({
        message: "mensaje enviado desde:controller/follow.js"
    })
}



//exportar acciones 
module.exports = {
    prueba_follow
}