const passport = require("passport")
let check=require('../index.js');
module.exports=app=>{
    const BlogController=require('../controllers/Blogs.controller')
    app.get('/blogs/home',passport.authenticate('jwt',{session:false}),BlogController.homeController)
    app.post('/blogs/addpost',passport.authenticate('jwt',{session:false}),BlogController.addPostController)
    app.post('/blogs/likeblog',passport.authenticate('jwt',{session:false}),BlogController.likePostController)
    app.post('/blogs/checklikes',passport.authenticate('jwt',{session:false}),BlogController.checklikesController)
}