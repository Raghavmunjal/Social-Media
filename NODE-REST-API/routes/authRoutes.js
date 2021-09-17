const router = require('express').Router();
const {signup,signin} = require('../controllers/authController')



// Register
router.post("/register",signup)

// Login
router.post("/login",signin)

module.exports = router;