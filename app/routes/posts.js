const router = require("express").Router();

//Import the controller functions.
const {
  getTimelinePosts,
  likeOrDislikePost,
  getSpecificPost,
  deletePost,
  updatePost,
  newPost,
} = require("../controllers/posts");

/*******************************
      Create a  Post.
*******************************/
router.post("/newpost", newPost);

/*******************************
      Update a  Post.
*******************************/
router.put("/:id", updatePost);

/*******************************
      Delete a  Post.
*******************************/
router.delete("/:id", deletePost);

/*******************************
      Get a specific Post.
*******************************/
router.get("/:id", getSpecificPost);

/*******************************
      Like/Dislike a  Post.
*******************************/
router.put("/:id/like", likeOrDislikePost);

/*******************************
      Get timeline Posts.
*******************************/
router.get("/timeline/all", getTimelinePosts);

module.exports = router;
