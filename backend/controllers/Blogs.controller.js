const BlogModel=require('../models/blogs.model')
const { follow } = require('./Users.controller')
exports.homeController=async (req,res)=>{
    try{
        let blogs=await BlogModel.getAllBlogs(req.user.id)
        res.status(200).json(blogs)
    }
    catch(err){
    console.log(err)
    res.status(500).json({message:"Unknown error occurred: "+err})
    }

}
exports.addPostController=async (req,res)=>{
    try{
        let blogtable= await BlogModel.addBlog({author:req.user.id,title:req.body.title,body:req.body.body})
        res.status(200).json({added:blogtable})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred: "+err})
    }
}
exports.likePostController= async (req,res)=>{
    console.log("like route fired")
    try{
        await BlogModel.likeBlog(req.user.id,req.body.id)
        console.log("line 27")
        res.status(200).json({message:"liked"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred: "+err})
    }
}
exports.checklikesController= async (req,res)=>{
    try{
        let likes=await BlogModel.checkLikes(req.body.id)
        console.log("likes controller: ",likes)
        res.status(200).json({likes:likes})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred: "+err})
    }
}
exports.getFollowed=async (req,res)=>{
    console.log("hit /blogs/followed route")
    try{
        let followed=await BlogModel.getFollowed(req.user.id)
        console.log("line 48 followed: ",followed)
        if(followed.length==0){
            res.status(200).json([])
        }
        else{
            let blogs= await BlogModel.getFollowedBlogs(followed,req.user.id)
            res.status(200).json(blogs)
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred: "+err})
    }
}