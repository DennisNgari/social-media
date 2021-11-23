const router = require("express").Router();

//Import the controller functions.
const {
  updateUser,
  deleteUser,
  getSpecificUser,
  followUser,
  unfollowUser,
} = require("../controllers/users");

/*******************************
      Update User
*******************************/
router.put("/:id", updateUser);

/*******************************
          Delete user
*******************************/
router.delete("/:id", deleteUser);

/*******************************
       Get a specific User
*******************************/
router.get("/:id", getSpecificUser);

/*******************************
      Follow a user
*******************************/
router.put("/:id/follow", followUser);

/*******************************
        Unfollow a user
*******************************/
router.put("/:id/unfollow", unfollowUser);

module.exports = router;
