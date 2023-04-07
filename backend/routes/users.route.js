const passport = require("passport")
let check=require('../index.js');
module.exports=app=>{
const UserController=require("../controllers/Users.controller")
//common routes
app.post('/users/register',UserController.registerController)
app.post('/users/login',UserController.loginController)
app.get('/users/getprofile',passport.authenticate('jwt',{session:false}),UserController.getProfileController)
app.get('/users/:username',passport.authenticate('jwt',{session:false}),UserController.otherProfile)
//post requests
app.post('/users/changeprofilepicture',passport.authenticate('jwt',{session:false}),UserController.changeProfilePicture)
app.post('/users/checkusername',UserController.checkusername)
app.post('/users/changeusername',passport.authenticate('jwt',{session:false}),UserController.changeUsername)
app.post('/users/checkpassword',passport.authenticate('jwt',{session:false}),UserController.checkpassword)
app.post('/users/changepassword',passport.authenticate('jwt',{session:false}),UserController.changepassword)
app.post('/users/follow',passport.authenticate('jwt',{session:false}),UserController.follow)
app.post('/users/unfollow',passport.authenticate('jwt',{session:false}),UserController.unfollow)
}