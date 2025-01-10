const express = require("express");
const router = express.Router();
const FollowController = require("../controller/follow");
const check = require("../middlewares/auth");


//difinir rutas
router.get("/prueba-follow", FollowController.prueba_follow);
router.post("/save", check.auth, FollowController.save);
router.delete("/unfollow/:id",check.auth,FollowController.unfollow);
router.get("/following/:id?/:page?",check.auth,FollowController.following);
router.get("/followers/:id?/:page?",check.auth,FollowController.followers);

module.exports = router;