const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    Posts: String,
    Likes:String,
    Following:String,
});

mongoose.model('User', UserSchema);