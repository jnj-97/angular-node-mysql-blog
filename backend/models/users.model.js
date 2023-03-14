const knex = require("../config/database");
exports.checkUsername=(username)=>{
    return new Promise(async function(resolve,reject)
    {
        console.log(username);
        try {
          let data= await  knex('users').where('username',username);
          console.log(data);
          resolve(data.length>0);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}
exports.registerUser=(user)=>{
    return new Promise(async function(resolve,reject){
        try{
            await knex('users').insert(user).then(res=>{
                resolve(res)
            })
        }catch(err){
            reject(err)
        }
    })
}
exports.fetchUser=(username)=>{
    return new Promise(async function(resolve,reject){
        try{
            let data= await knex('users as u').where('username',username);
            console.log(data)
            resolve(data[0])
        }catch(err){
            reject(err)
        }
    })
}
exports.getAllBlogs=()=>{
    return new Promise(async function(resolve,reject){
        try{
            let data=await knex.select("*").from('blogs as b').join('users as u','b.author','=','u.user_id')
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