const express = require("express");
const router = express.Router();
const FollowController = require("../controller/follow");


//difinir rutas
router.get("/prueba-follow",FollowController.prueba_follow);

module.exports = router;
