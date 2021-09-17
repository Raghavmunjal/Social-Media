const router = require('express').Router();
const {updateUser,deleteUser,getUser,followUser,unFollowUser} = require('../controllers/userController')

// Update user
router.put("/:id",updateUser);

// Delete user
router.delete("/:id",deleteUser);

// Get a user
router.get("/:id",getUser);

// Follow a user
router.put("/:id/follow",followUser);

// Unfollow a user
router.put("/:id/unfollow",unFollowUser);

module.exports = router;