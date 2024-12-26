const mongoose = require("mongoose");

const conexion = async () => {

    try {
        await mongoose.connect("mongodb://localhost:27017/RedSocial");
        console.log("Conectado correctamente a bd : Red Social")
    } catch (error) {
        console.log(error)
        throw new Error("No se ha podifo conectar ala base de datos !!");
    }


}

module.exports = 
    conexion
