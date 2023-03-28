
const knex = require("../config/database");
exports.getAllBlogs=(id)=>{
    return new Promise(async function(resolve,reject){
        try{
            let data=await knex.select("b.id","b.title","b.body","b.created_time","u.username","u.profile_picture").from('blogs as b').join('users as u','b.author','=','u.user_id')
           for(let element of data)
           {
                let likes= await knex('likes')
                .count('blog_like_id as count')
                .where('blog_like_id',element.id).first()
                element.likes=likes.count
                let liked=await knex('likes').where('blog_like_id',element.id).andWhere('user_like_id',id)
                if(liked.length==0){
                    element.liked=false
                }
                else if(liked.length>0){
                    element.liked=true
                }          
           }
           console.log(data)
           resolve(data)
        }catch(err){
            reject(err)
        }
    })
}
exports.addBlog=(blog)=>{
    return new Promise(async function(resolve,reject){
        try{
            let data=await knex('blogs').insert(blog)
        }catch(err){
            console.log(err)
            reject(err)
        }
    })
}
exports.likeBlog=(author,blog)=>{
    return new Promise(async function(resolve,reject){
        try{
            let checkLiked=await knex('likes').where('user_like_id',author).andWhere('blog_like_id',blog)
            if(checkLiked.length==0){
               await knex('likes').insert({user_like_id:author,blog_like_id:blog})
               console.log("added to like table")
               resolve()
            }
            else if(checkLiked.length>0){
               await knex('likes').where('user_like_id',author).andWhere('blog_like_id',blog).delete()
                resolve()
            }
        }catch(err){
            console.log(err)
            reject(err)
        }
    })
}
exports.checkLikes=(blog)=>{
    return new Promise(async function (resolve,reject){
        try{
            let likes= await knex('likes')
            .count('blog_like_id as count')
            .where('blog_like_id',blog).first()
           
                resolve(likes.count)
        }catch(err){
            console.log(err)
            reject(err)
        }
    }
    )
}