const router = require("express").Router();

//Get the Imports
const { registerNewUser, loginUser } = require("../controllers/auth");

/*******************************
      Register a new User
*******************************/
router.post("/register", registerNewUser);

/*******************************
        Login  User
*******************************/
router.post("/login", loginUser);

module.exports = router;
