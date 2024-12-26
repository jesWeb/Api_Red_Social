const express = require("express");
const router = express.Router();
const PubliController = require("../controller/piblication");


//difinir rutas
router.get("/prueba-publi",PubliController.publication);

module.exports = router;
