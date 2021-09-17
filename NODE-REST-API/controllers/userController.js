const UserSchema = require("../models/userModel")
const bcrypt = require("bcryptjs")


const updateUser = async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(12);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            } catch (error) {
                res.status(500).json(error)
            }
        }

        try {
            const user = await UserSchema.findByIdAndUpdate(req.params.id,{$set:req.body})
            res.status(200).json("Account Updated")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You can Update your account only")
    }
}


const deleteUser = async (req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        
        try {
            const user = await UserSchema.findByIdAndDelete(req.params.id)
            res.status(200).json("Account Deleted")
        } catch (error) {
            res.status(500).json(error)
        }

    }else{
        res.status(403).json("You can Delete your account only")
    }
}

const getUser = async (req,res) => {
    try {
        const user = await UserSchema.findById(req.params.id);
        !user && res.status(404).json({message:"User Not Found"})
        const {password,updatedAt,...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
}

const followUser = async (req,res) => {
    // current user following the user
    if(req.body.userId !== req.params.id){
        try {
            const user = await UserSchema.findById(req.params.id)
            const currentUser = await UserSchema.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json("user has been followed")
            }else{
                res.status(403).json("You already follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You cant follow yourself")
    }
}


const unFollowUser = async (req,res) => {
    // current user unfollowing the user
    if(req.body.userId !== req.params.id){
        try {
            const user = await UserSchema.findById(req.params.id)
            const currentUser = await UserSchema.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("user has been unfollowed")
            }else{
                res.status(403).json("You dont not follow this user")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You cant unfollow yourself")
    }
}



module.exports = {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unFollowUser
};