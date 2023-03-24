
const knex = require("../config/database");
exports.getAllBlogs=()=>{
    return new Promise(async function(resolve,reject){
        try{
            let data=await knex.select("b.title","b.body","b.created_time","u.username","u.profile_picture").from('blogs as b').join('users as u','b.author','=','u.user_id')
            resolve(data)
            // ,function(){
            //     this.on('b.author','=','u.user_id').then(
            //         rows=>console.log(rows)
            //     )
            //     resolve(rows)
            // }
            
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