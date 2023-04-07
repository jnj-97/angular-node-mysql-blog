
const knex = require("../config/database");
exports.getAllBlogs=(id)=>{
    return new Promise(async function(resolve,reject){
        try{
            let data=await knex.select("b.id","b.title","b.body","b.created_time","u.username","u.profile_picture").from('blogs as b').join('users as u','b.author','=','u.user_id').orderBy('created_time','desc')
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
    return new Promise(async function(resolve,reject){
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
exports.getUserBlogs=(userid)=>{
    return new Promise(async function(resolve,reject){
        try{
            let blogs=await knex('blogs').where('author',userid).orderBy('created_time','desc')
            resolve(blogs)
        }catch(err){
            reject(err)
        }
    })
}
exports.checkLiked=(userid,blogid)=>{
    return new Promise(async function(resolve,reject){
        try{
            let liked= await knex('likes').where('user_like_id',userid).andWhere('blog_like_id',blogid)
            if(liked.length==0){
                resolve(false)
            }
            else if(liked.length>0){
                resolve(true)
            }          
        }catch(err){
            reject(err)
        }
    })
}
exports.getFollowed=(id)=>{
    return new Promise(async function(resolve,reject){
        try{
            let followed=await knex('followers').where('follower_id',id)
            resolve(followed)
        }catch(err){
            console.log(err)
            reject(err)
        }
    })
}
exports.getFollowedBlogs=(followed,id)=>{
    return new Promise(async function(resolve,reject){
        try{
            let blogs=await knex.select("b.id","b.title","b.body","b.created_time","u.username","u.profile_picture").join('users as u','b.author','=','u.user_id').from('blogs as b').whereIn('b.author',followed.map(obj=>obj.followee_id)).orderBy('b.created_time','desc')
            for(let element of blogs)
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
           console.log("followed blogs: ",blogs )
            resolve(blogs)
        }catch(err){
            console.log(err)
            reject(err)
        }

    })
}