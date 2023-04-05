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
exports.getUser=(userid)=>{
    return new Promise(async function(resolve,reject){
        try{
            let data=await knex('users as u').select('u.email','u.profile_picture','u.username').where('user_id',userid);
            resolve(data[0])
        }catch(err){
            reject(err)
        }
    })
}
exports.changeProfilePicture=(image,id)=>{
    return new Promise(async function(resolve,reject){
        try{
            let data=await knex('users as u').where('user_id',id).update('profile_picture',image)
            resolve()
        }catch(err){
            console.log(err)
            reject(err)
        }
    })
}
exports.checkProfile=(username)=>{
    return new Promise(async function(resolve,reject){
        try{
            let data=await knex('users').where('username',username)
            resolve(data)
        }catch(err){
            console.log(err)
            reject(err)
        }
    })
}
exports.changeusername=(username,id)=>{
    return new Promise(async function(resolve,reject){
        try{let data=await knex('users').where('user_id',id).update('username',username)
        resolve()}catch(err){
            console.log(err)
            reject(err)
        }
    })
}
exports.checkpassword=(id)=>{
    return new Promise(async function(resolve,reject){
        try{
            let user=await knex('users').where('user_id',id);
            resolve(user[0])
        }catch(err){
            console.log(err)
            reject(err)
        }
    })
}
exports.changepassword=(password_hash,id)=>{
    return new Promise(async function(resolve,reject){
        try{
            let password=await knex('users').where('user_id',id).update('password',password_hash)
            resolve()
        }catch(err){
            console.log(err)
            reject(err)
        }
    })
}