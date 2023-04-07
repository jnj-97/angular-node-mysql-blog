const UserModel=require('../models/users.model')
const BlogsModel=require('../models/blogs.model')
const utils=require('../utils/utils')
const bcrypt=require('bcrypt')
exports.registerController=async (req,res)=>{
    try {
        console.log(req.body)
      let result= await UserModel.checkUsername(req.body.name);
      if(result)
      {
        res.send({message:"Already exists"});
      }
      else
      {
        let password=bcrypt.hashSync(req.body.password,parseInt(process.env.SALT_ROUNDS))
        let newUser=await UserModel.registerUser({email:req.body.email,password:password,profile_picture:"",username:req.body.name});
        res.status(200).send({message:"added"});
      }
    } catch (error) {
        console.log(error)
            res.status(500).json(error);
    }
}
exports.loginController=async (req,res)=>{
    try{
        let result=await UserModel.checkUsername(req.body.username);
        console.log(req.body)
        if(result){
            let user=await UserModel.fetchUser(req.body.username)
        let password_hash= utils.validPassword(req.body.password,user.password)
        if(password_hash){
            const jwt=utils.issueJWT(user)
            res.status(200).json({message:"true",token:jwt.token,expiresIn:jwt.expires})
        }
        else if(!password_hash){
            res.send({message:"Invalid Password"})
        }
        }
        else if(!result){
            res.send({message:"Invalid User. Please Register"})
        }
        else{
            res.send({message:"Unknown Error"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}
exports.getProfileController=async (req,res)=>{
    try{
        let user= await UserModel.getUser(req.user.id)
        let blogs=await BlogsModel.getUserBlogs(req.user.id)
        for(let blog of blogs){
            let likes=await BlogsModel.checkLikes(blog.id)
            blog.likes=likes
            let liked= await BlogsModel.checkLiked(req.user.id,blog.id)
            blog.liked=liked
        }
        user.blogs=blogs
        console.log("user: ",user)
        res.send(user)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred"+err})
    }
}
exports.changeProfilePicture=async (req,res)=>{
    try{
        let changedProfilePicture=await UserModel.changeProfilePicture(req.body.image,req.user.id)
        res.send({message:"changed"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Unknown error occurred"+err})
    }
}
exports.checkusername= async (req,res)=>{
    try{
        let profile=await UserModel.checkProfile(req.body.username)
        if(profile.length>0){
            res.status(200).json({message:'exists'})
        }
        else{
            res.status(200).json({message:"doesnt exist"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred"+err})
    }
}
exports.changeUsername=async (req,res)=>{
    try{
        let username=await UserModel.changeusername(req.body.username,req.user.id)
        res.status(200).json({message:"changed"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred"+err})
    }
}
exports.checkpassword=async (req,res)=>{
    try{
        let password=await UserModel.checkpassword(req.user.id)
        let password_hash=utils.validPassword(req.body.oldpassword,password.password)
        if(password_hash){
            res.status(200).json({message:"true"})
        }
        else{
            res.status(200).json({message:"false"})
        }
    }catch(err){
    console.log(err)
    res.status(500).json({message:"Unknown error occurred"+err})
    }
}
exports.changepassword=async (req,res)=>{
    try{
        let password_hash=utils.genPassword(req.body.newpassword)
        let password=await UserModel.changepassword(password_hash,req.user.id)
        res.status(200).json({message:"changed"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred"+err})
    }
}
exports.otherProfile=async (req,res)=>{
    try{
        let otherprofile=await UserModel.otherProfile(req.params.username)
        console.log(otherprofile);
        if(otherprofile.length>0)
        {
            let blogs=await BlogsModel.getUserBlogs(otherprofile[0].user_id)
            console.log("1");
        for(let blog of blogs){
            console.log("2");
            let likes=await BlogsModel.checkLikes(blog.id)
            blog.likes=likes
            let liked= await BlogsModel.checkLiked(req.user.id,blog.id)
            blog.liked=liked
        }
        otherprofile[0].blogs=blogs
        let followed=await UserModel.checkFollowed(otherprofile[0].user_id,req.user.id)
        otherprofile[0].followed=followed
        otherprofile[0].message="user exists"
        delete otherprofile[0].user_id
        console.log("3");
        res.status(200).json(otherprofile[0])    
    }
    else if(otherprofile.length==0)
        {
            console.log("4");
           res.status(200).json({message:"User doesnt exist"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred"+err})
    }
}
exports.follow=async (req,res)=>{
    try{
        let follow=await UserModel.follow(req.body.username,req.user.id)
        res.status(200).json({message:"followed"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred"+err})
    }
}
exports.unfollow=async (req,res)=>{
    try{
        let unfollow=await UserModel.unfollow(req.body.username,req.user.id)
        res.status(200).json({message:"unfollowed"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Unknown error occurred"+err})
    }
}