const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
//expportar middlerware
const check = require("../middlewares/auth");

//rutas Api
router.get("/prueba-user", check.auth, UserController.prueba_User);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.login);





module.exports = router;


//middelware que es ? en resumen se ejecuta antes de el metodo podt get etc 