const fs = require('fs');

const path = require('path');
const knex = require("../config/database");
const JwtStrategy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt;
require('dotenv').config()

const options = {
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:process.env.JWT_SECRET,
};
const strategy=new JwtStrategy(options,(payload,done)=>
{
    console.log(payload)
    done(null,payload) 
})
module.exports = (passport) => {
    console.log("SDSDSD")
    passport.use(strategy)
}