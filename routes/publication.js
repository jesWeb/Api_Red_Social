const express = require("express");
const router = express.Router();
const PubliController = require("../controller/piblication");
const check = require("../middlewares/auth");

//difinir rutas
router.get("/prueba-publi", PubliController.publication);
router.get("/save", check.auth, PubliController.save);
router.get("/detail/:id", check.auth, PubliController.mostar);
router.remove("/remove/:id", check.auth, PubliController.remove);
router.get("/user/:id/:page?", check.auth, PubliController.user);



module.exports = router;