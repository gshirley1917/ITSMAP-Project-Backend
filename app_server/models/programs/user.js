import mongoose, { Mongoose } from 'mongoose'
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';
import userSchema from '../schemas/user'
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

//TODO store iterations, keylength, hash algorithm as variables
var iterations = 10000;
var keylength = 128;
var hashAlgorithm = 'sha256';

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(24).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 
        iterations, keylength, hashAlgorithm).toString('hex');
}

userSchema.methods.validatePassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 
        iterations, keylength, hashAlgorithm).toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJwt = function(){
    var expiration = new Date();
    //TODO change expiration of JWT ?
    expiration.setDate(expiration.getDate() + 2);

    //getTime() / 1000, time is in milliseconds
    return jwt.sign({
        email: this.email,
        firstName: this.firstName,
        surName: this.surName,
        exp: parseInt(expiration.getTime() / 1000),
    }, process.env.JWT_SECRET);
}

userSchema.plugin(MongooseAutoIncrementID.plugin, {
    modelName: 'userProgram',
});

let userProgram = mongoose.model('userProgram', userSchema);

export default userProgram;