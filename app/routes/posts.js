const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/UserModel");

/*******************************
	        POST
      Create a  Post.
*******************************/
router.post("/newpost", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*******************************
	        PUT
      Update a  Post.
*******************************/
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json("The Post has been updated!");
    } else {
      res.status(403).json("You Can ONLY update your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

/*******************************
	        DELETE
      Delete a  Post.
*******************************/
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.deleteOne();
      res.status(200).json("The Post has been Deleted!");
    } else {
      res.status(403).json("You Can ONLY delete your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

/*******************************
	        GET
      Get a specific Post.
*******************************/
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*******************************
	        PUT
      Like/Dislike a  Post.
*******************************/
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //This adds the like functionality.
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked!");
    } else {
      //This adds the disliked functionality.
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

/*******************************
	        GET
      Get timeline Posts.
*******************************/
router.get("/timeline/all", async (req, res) => {
  //we add timeline/all => avoids the confliction between the get by id request.
  try {
    //Since we have several responses, we use promises.
    const currentUser = await User.findById(req.body.userId);

    //Add all the posts of this current user to this current array.
    const userPosts = await Post.find({ userId: currentUser._id });

    //Find the posts of all the users followings.
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
