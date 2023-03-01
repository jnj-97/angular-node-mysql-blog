const UserModel=require('../models/users.model')
const utils=require('../utils/utils')
const bcrypt=require('bcrypt')
exports.RegisterController=async (req,res)=>{
    try {
      let result= await UserModel.checkUsername(req.body.username);
      if(result)
      {
        res.send({message:"Already exists"});
      }
      else
      {
        let password=bcrypt.hashSync(req.body.password,process.env.SALT_ROUNDS)
        let newUser=await UserModel.registerUser({email:req.body.email,password:password,profile_picture:"",username:req.body.username});
        res.send({message:"added"});
      }
    } catch (error) {
            res.status(500).json(error);
    }
}