const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose); //automatically implement username ,password,hashing,salting and methods(like authenticate)

module.exports = mongoose.model('User', userSchema);

