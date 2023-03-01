module.exports=app=>{
const UserController=require("../controllers/Users.controller")
//common routes
app.get('/users/register',UserController.RegisterController)
//app.get('/users/login',UserController.LoginController)
}