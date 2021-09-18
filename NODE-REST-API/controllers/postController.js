const PostSchema = require("../models/postModel")
const UserSchema = require("../models/userModel")

const createPost = async(req,res) => {
    const newPost = await PostSchema(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updatePost = async(req,res) => {
    try {
        const post = await PostSchema.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("The post has been updated")
        }else{
            res.status(403).json("you can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
}

const deletePost = async(req,res) => {
    try {
        const post = await PostSchema.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("The post has been deleted")
        }else{
            res.status(403).json("you can delete only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const likePost = async(req,res) => {
    try {
        const post = await PostSchema.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push:{likes:req.body.userId} })
            res.status(200).json("The post has been liked")
        }else{
            await post.updateOne({ $pull:{likes:req.body.userId} })
            res.status(200).json("The post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const getPost = async(req,res) => {
    try {
        const post = await PostSchema.findById(req.params.id);
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

const timelinePost = async(req,res) => {
    
    try {
        const currentUser = await UserSchema.findById(req.body.userId)
        const userPosts = await PostSchema.find({ userId : currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) =>{
                return PostSchema.find({userId : friendId})
            })
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    timelinePost
}