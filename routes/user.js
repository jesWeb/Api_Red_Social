const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
//expportar middlerware
const check = require("../middlewares/auth");
const multer = require("multer");
//crear el almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatars/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + Date.now() + "-" + file.originalname);
    }
})
//pasar el middelware para el almacenamiento 
const uploads = multer({
    storage
})
//rutas Api

//user
router.get("/prueba-user", check.auth, UserController.prueba_User);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.login);
router.get("/perfil/:id", check.auth, UserController.profile);
router.get("/list/:page?", check.auth, UserController.list);
router.put("/update", check.auth, UserController.update);
router.post("/upload", [check.auth, uploads.single("file0")], UserController.upload);
router.get("/avatar/:file", check.auth, UserController.avatar);

//


//exportar modulos
module.exports = router;


//middelware que es ? en resumen se ejecuta antes de el metodo podt get etc 