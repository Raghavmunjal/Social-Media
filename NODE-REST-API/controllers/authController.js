const UserSchema = require("../models/userModel")
const bcrypt = require("bcryptjs")

const signup = async(req,res)=>{
    const {username,email,password} = req.body
    try {
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = await new UserSchema({username, email, password:hashPassword})
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

const signin = async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserSchema.findOne({email})
        !user && res.status(404).json({message:"User Not Found"})

        const isPasswordMatch = await bcrypt.compare(password,user.password)
        !isPasswordMatch && res.status(400).json({message:"Wrong Password"})

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    signup,
    signin
};