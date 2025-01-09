const express = require("express");
const router = express.Router();
const FollowController = require("../controller/follow");
const check = require("../middlewares/auth");


//difinir rutas
router.get("/prueba-follow", FollowController.prueba_follow);
router.post("/save", check.auth, FollowController.save);

module.exports = router;