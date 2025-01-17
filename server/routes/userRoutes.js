const express = require("express");

const usersController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);
router.route("/:id").get(usersController.getOneUser);

module.exports = router;
