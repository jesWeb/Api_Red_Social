//importar dependecnias
const conexion = require("./database/conection");
const express = require("express");
const cors = require("cors");
//mensaje conexion
console.log('api rest social conectada');

//conexion db
conexion();

// crear servidor 
const app = express();
const puerto = 3900;

// configurar cors - middleware
app.use(cors());

//convertir los datos del body a objetos js 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//cargar rutas 
const UseRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const followRoutes = require("./routes/follow");
//ejecutar rutas
app.use("/api/user",UseRoutes);
app.use("/api/publication",PublicationRoutes);
app.use("/api/follows",followRoutes);



//poner servidor a escuchar servidores http
app.listen(puerto, ()=>{
    console.log('Servidor de node corriendo en :' , puerto )
});
