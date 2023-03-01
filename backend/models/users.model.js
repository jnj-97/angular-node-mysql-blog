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
            reject(error);
        }
    })
}
exports.registerUser=(user)=>{
    return new Promise(async function(resolve,reject){
        try{
            await knex('users').insert(user).then(res=>{
                console.log(res)
                resolve(res)
            })
        }catch(err){
            reject(err)
        }
    })
}