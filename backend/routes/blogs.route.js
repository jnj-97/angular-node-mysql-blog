const passport = require("passport")
module.exports=app=>{
    const BlogController=require('../controllers/Blogs.controller')
    app.get('/blogs/home',passport.authenticate('jwt',{session:false}),BlogController.homeController)
    app.get('/blogs/followed',passport.authenticate('jwt',{session:false}),BlogController.getFollowed)
    //post routes
    app.post('/blogs/addpost',passport.authenticate('jwt',{session:false}),BlogController.addPostController)
    app.post('/blogs/likeblog',passport.authenticate('jwt',{session:false}),BlogController.likePostController)
    app.post('/blogs/checklikes',passport.authenticate('jwt',{session:false}),BlogController.checklikesController)
    app.post('/blogs/addComment',passport.authenticate('jwt',{session:false}),BlogController.addComment)
    app.post('/blogs/likeList',passport.authenticate('jwt',{session:false}),BlogController.likeList)
}