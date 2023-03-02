const UserModel=require('../models/users.model')
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
exports.protectedController=(req,res)=>{
    console.log("s1d2a31d2a1")
    console.log(req.user)
    res.status(200).json({message:"Authorized user"})
}