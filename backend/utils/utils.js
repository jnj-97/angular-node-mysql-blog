const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const moment=require('moment')

function validPassword(password,hash) {
    return bcrypt.compareSync(password,hash);
}

function genPassword(password) {
    bcrypt.hashSync(password,process.env.SALT_ROUNDS).then(res=>{
        return res}
    )
}



function issueJWT(user) {
  const _id = user.user_id;
  const expiresIn = '1d';

  const payload = {
    id: _id,
    iat: Date.now(),
    expiresIn:moment().add('2','w')
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
  
  return {
    token:signedToken,
    expires: expiresIn
  }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;