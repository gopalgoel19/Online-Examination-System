var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
mongoose.Promise = require('bluebird');//something about promises in MongoDB . Will have to read upon it

var userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPasswordEncrypted: { type: Boolean, default: false },
    role: { type: String, required: true, enum: ['student', 'admin', 'teacher'] },//STUDENT,ADMIN,TEACHER
});

//schema methods

userSchema.methods.encrypt= function(password){
    // return encrypted text
};

userSchema.pre('save', function(next){
    if(this.isPasswordEncrypted == false) {
        this.passwrod = this.encrypt(this.passwrod);
        this.isPasswordEncrypted = true;
    }
    next();
});


//modelName maps to collections in plural
var userModel = mongoose.model("user",userSchema);

exports.schema = userSchema;
//Instance of a Model is a Document
module.exports = userModel;
