const BlogModel=require('../models/blogs.model')
exports.homeController=async (req,res)=>{
    try{
        let blogs=await BlogModel.getAllBlogs()
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