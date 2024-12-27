const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
//expportar middlerware
const check = require("../middlewares/auth");

//rutas Api
router.get("/prueba-user", check.auth, UserController.prueba_User);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.login);
router.get("/perfil/:id", check.auth, UserController.profile);
router.get("/list/:page?",check.auth,UserController.list)





module.exports = router;


//middelware que es ? en resumen se ejecuta antes de el metodo podt get etc 