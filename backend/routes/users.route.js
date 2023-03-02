const passport = require("passport")
let check=require('../index.js');
module.exports=app=>{
const UserController=require("../controllers/Users.controller")
//common routes
app.post('/users/register',UserController.registerController)
app.post('/users/login',UserController.loginController)
app.get('/users/protected',passport.authenticate('jwt',{session:false}),UserController.protectedController)
}