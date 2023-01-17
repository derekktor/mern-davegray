const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.route("/")
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .delete(usersController.updateUser)
    .put(usersController.deleteUser)


module.exports = router;