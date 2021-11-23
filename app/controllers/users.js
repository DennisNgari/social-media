const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

/*******************************
	        PUT
      Update User
*******************************/
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    req.status(403).json("You can ONLY update your account!");
  }
};

/*******************************
	        DELETE
          Delete user
*******************************/
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "Account has been deleted Successfully!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can ONLY Delete your account!");
  }
};

/*******************************
	        GET
       Get a specific User
*******************************/
const getSpecificUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

/*******************************
	        PUT
      Follow a user
*******************************/
const followUser = async (req, res) => {
  //Check if the users are the same.
  if (req.body.userId !== req.params.id) {
    try {
      //Check the user with the id plus the current user that's trying to make the request.
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      //if the current user is not following this user, update the followers and the followings array.
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed!");
      } else {
        res.status(403).json("You already Follow this User!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
    //The else block checks if the users are the same.
  } else {
    res.status(403).json("You can't Follow yourself! ");
  }
};

/*******************************
      	    POST    
        Unfollow a user
*******************************/
const unfollowUser = async (req, res) => {
  //Check if the users are the same.
  if (req.body.userId !== req.params.id) {
    try {
      //Check the user with the id plus the current user that's trying to make the request.
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      //if the current user is following this user, remove and update the follower and the followings array.
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed!");
      } else {
        res.status(403).json("You dont follow this User!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
    //The else block checks if the users are the same.
  } else {
    res.status(403).json("You can't unfollow yourself! ");
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getSpecificUser,
  followUser,
  unfollowUser,
};
