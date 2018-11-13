import userProgram from '../models/user';
import mongoose from 'mongoose';
import workoutLogSchema from '../models/log';
import WorkoutProgram from '../models/workoutProgram';
import { callbackify } from 'util';
require('crypto');

let userController = {};

userController.register = (req,res) => {
    //console.log(req);
    if(!req.body.firstName || !req.body.surName ||
        !req.body.email || 
        !req.body.password){
            res
                .status(400)
                .json({"message" : "All fields required"});
            return;
    }

    //Check if email is registed, if not register it
    userProgram.count({email : req.body.email}, function (err, count){
        if(count > 0){
            //Email is already registered
            res
                .status(400)
                .json({"message" : "Email is already registered"});
            return true;
        }else{
            //Create New User
            const user = new userProgram();
            user.firstName = req.body.firstName;
            user.surName = req.body.surName;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            user.save(function(error){
                var jwtToken;
                if(error){
                    res
                        .status(400)
                        .json({"message" : error});
                    return false;
                }else{
                    jwtToken = user.generateJwt();
                    res
                        .status(200)
                        .json({"token" : jwtToken, "email" : user.email, "firstName" : user.firstName, "surName" : user.surName});
                    return false;
                }
            })
        }
    });
   return;
}

userController.login = (req,res) => {
    //Make sure the request has an email field and password field
    if(!req.body.email || !req.body.password){
        res
            .status(400)
            .json({"message" : "All fields required"});
        return;
    }

    //See if email is registered, if so attempt to validate password, respond with appropriate json information
    userProgram.count({email : req.body.email}, function (err, count){

        //Check to see if email is registered
        if(count == 0){
            res
                .status(400)
                .json({"message" : "Email is not registered"});
                return true;
        }else{
            //Find the document with the email from the request
            userProgram.find({email : req.body.email}, function(err,doc){
                
                //Create new user, copy over information from query
                var currentUser = new userProgram();
                currentUser.email = doc[0].email;
                currentUser.firstName = doc[0].firstName;
                currentUser.surName = doc[0].surName;
                currentUser.salt = doc[0].salt;
                currentUser.hash = doc[0].hash;

                //If the password is valid, return json information as per api specs
                if(currentUser.validatePassword(req.body.password)){
                    res
                        .status(200)
                        .json({"token" : currentUser.generateJwt(), "email" : currentUser.email,
                        "firstName" : currentUser.firstName, "surName" : currentUser.surName});
                    return;
                }else{
                    res
                        .status(400)
                        .json({"message" : "Password is invalid"});
                    return;
                }
            });
            return false;
        }
    });
    return;
}

userController.getWorkoutLogs = (req, res) => {
    //For user logged in, get their logs and return them
    userProgram.findOne({email : req.payload.email}).exec(function (err, user){
        if(!user){
            res
                .status(404)
                .json({"message" : "User not found"});
            return;
        }else if(err){
            console.log(err);
            res
                .status(404)
                .json({"message" : err});
            return;
        }
        res
            .status(200)
            .json(user.logs);
        return;
    });
    return;
}

let workoutLogProgram = mongoose.model('workoutLogProgram', workoutLogSchema);

userController.addWorkoutLog = (req, res) => {
    if(!req.body.date || !req.body.workout._id){
        res
            .status(400)
            .json({"message" : "Date and id required"});
        return;
    }

    var newLog = new workoutLogProgram();
    
    //Find workout by id and add to log
    WorkoutProgram.find({"_id" : req.body.workout._id}, function (err, doc){

        newLog.date = req.body.date;
        newLog.workout = doc[0];


        //Find the user logged in, add newLog to logs
        userProgram.findOne({email : req.payload.email}).exec(function (err, user){
            if(!user){
                res
                    .status(404)
                    .json({"message" : "User not found"});
                return;
            }else if(err){
                console.log(err);
                res
                    .status(404)
                    .json({"message" : err});
                return;
            }
        userProgram.findOneAndUpdate({email :req.payload.email}, {$addToSet : {logs : newLog}}).then(() =>{
            res
                .status(200)
                .json(newLog);
            return;
        });
            return;
        });
        return;
    });
    return;
}

export default userController;