const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");


//difinir rutas
router.get("/prueba-user",UserController.prueba_User);
router.post("/register",UserController.registerUser);
router.post("/login",UserController.login);





module.exports = router;
 

//middelware que es ? en resumen se ejecuta antes de el metodo podt get etc 