const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    googleId: String,
    userImage: String
});


module.exports  = mongoose.model('User', UserSchema);