const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

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
  console.log(_id)
  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
  
  return {
    token:signedToken,
    expires: expiresIn
  }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;