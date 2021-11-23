//This is the auth Route that handlesa the registration and Login of users.
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

/*******************************
	        POST
      Register a new User
*******************************/
const registerNewUser = async (req, res) => {
  try {
    //Generate New Password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    //Create New User.
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPass,
    });

    //Save User.
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*******************************
	        POST
        Login  User
*******************************/
const loginUser = async (req, res) => {
  try {
    //Find if the User Exists.
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send("Email does NOT exist!");

    //Validate Password.
    const validPass = await bcrypt.compare(req.body.password, user.password);
    !validPass && res.status(400).json("Invalid Password!");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { registerNewUser, loginUser };
