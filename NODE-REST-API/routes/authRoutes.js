const router = require('express').Router();

const UserSchema = require('../models/userModel')

//Register
router.get("/register",async(req, res) => {
    const user = await new UserSchema({
        username: "john",
        email:"john@gmail.com",
        password: "12345678"
    })
    await user.save()
    res.send("success")
})

module.exports = router;