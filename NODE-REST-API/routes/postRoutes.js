const router = require('express').Router();
const {createPost,updatePost,deletePost,likePost,getPost,timelinePost} = require("../controllers/postController")

// create a post
router.post("/",createPost);

// update a post
router.put("/:id",updatePost);

// delete a post
router.delete("/:id",deletePost);

// likes/dislikes a post
router.put("/:id/like",likePost);

// get a post 
router.get("/:id",getPost);

// get timeline posts
router.get("/timeline/all",timelinePost);

module.exports = router;