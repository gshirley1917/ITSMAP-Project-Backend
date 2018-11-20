import teamProgram from '../models/programs/team';
import studentProgram from '../models/programs/student';
import testProgram from '../models/programs/test';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';

let teamController = {};

teamController.list = (req, res) => {
    teamProgram.find().then(teams => {
        res
            .status(200)
            .json(teams);
        return;
    });
    return;
}

teamController.detail = (req, res) => {
    if(!req.params.id){
        res
            .status(400)
            .json({"message" : "id cannot be empty"});
        return;
    }
    const teamId = req.params.id;
    teamProgram.findById(teamId).then(team => {
        res
            .status(200)
            .json(team);
        return;
    });
    return;
}

teamController.addNewTeam = (req, res) => {
    if(!req.body.teamName){
        res
            .status(400)
            .json({"message" : "teamName cannot be empty"});
        return;
    }

    var newTeam = new teamProgram();
    newTeam.teamName = req.body.teamName;
    newTeam.save(function(error, savedObject){
        if(error){
            res
                .status(500)
                .json({"message" : error});
            return;
        }else{
            res
                .status(200)
                .json(savedObject);
            return;
        }
    });
    return;
}

teamController.addStudent = (req, res) => {
    if(!req.body.firstName || !req.body.lastName || !req.body.division){
        res
            .status(400)
            .json({"message" : "firstName, lastName and division cannot be empty"});
        return;
    }
    teamProgram.findByIdAndUpdate()


    //TODO fix student id
    var newStudent = new studentProgram();
    newStudent.firstName = req.body.firstName;
    newStudent.lastName = req.body.lastName;
    switch(req.body.division){
        case "honors":
            newStudent.division = "honors";
            newStudent.id = req.params.id + "1"; 
            teamProgram.findByIdAndUpdate(req.params.id,{
                $addToSet : {honorsStudents : newStudent}
            }).then(() =>{
                res
                    .status(200)
                    .json(newStudent);
                return;
            });
            break;
        case "scholastic":
            newStudent.division = "scholastic";
            newStudent.id = req.params.id + "2";
            teamProgram.findByIdAndUpdate(req.params.id,{
                $addToSet : {scholasticStudents : newStudent}
            }).then(() =>{
                res
                    .status(200)
                    .json(newStudent);
                return;
            });
            break;
        case "varsity":
            newStudent.divison = varsity;
            newStudent.id = req.params.id + "3";
            teamProgram.findByIdAndUpdate(req.params.id,{
                $addToSet : {varsityStudents : newStudent}
            }).then(() =>{
                res
                    .status(200)
                    .json(newStudent);
                return;
            });
            break;
        default:
            res
                .status(400)
                .json({"message" : "division is invalid"});
            return;
    }
    return;
}

teamController.detailStudent = (req, res) => {
    //TODO find student by studentId and send as response
    teamProgram.findById(req.params.id, function(err,doc){
        if(err){
            res
                .status(500)
                .json(err);
            return;
        }else{
            if(doc == null){
                res
                    .status(400)
                    .json({"message" : "team not found"});
                return;
            }
            for(var i = 0; i < doc.honorsStudents.length; i++){
                if(doc.honorsStudents[i].id == req.params.studentId){
                    res
                        .status(200)
                        .json(doc.honorsStudents[i]);
                    return;
                }
            }
            for(var i = 0; i < doc.scholasticStudents.length; i++){
                if(doc.scholasticStudents[i].id == req.params.studentId){
                    res
                        .status(200)
                        .json(doc.scholasticStudents[i]);
                    return;
                }
            }
            for(var i = 0; i < doc.varsityStudents.length; i++){
                if(doc.varsityStudents[i].id == req.params.studentId){
                    res
                        .status(200)
                        .json(doc.varsityStudents[i]);
                    return;
                }
            }
            res
                .status(400)
                .json({"message" : "student with id studentId not found"});
            return;
        }
    });
    return;
}

teamController.addTest = (req, res) => {
    if(!req.body.testName || !req.body.testScore){
        res
            .status(400)
            .json({"message" : "testName and testScore cannot be empty"});
        return;
    }
    switch(req.body.testName){
        case "art" :
        case "economics" :
        case "essay" : 
        case "interview" :
        case "literature" : 
        case "mathematics" :
        case "music" : 
        case "science" : 
        case "social science" :
        case "speech" :
            break;
        default:
            res
                .status(400)
                .json({"message" : "testName not valid"});
            return;
    }
    if(req.body.testScore > 1000){
        res
            .status(400)
            .json({"message" : "testScore over 1000"});
    }
    var newTest = new testProgram();
    newTest.name = req.body.testName;
    newTest.score = req.body.testScore;

    //TODO find team, find student, if test with name exists, overwrite score, if not add to student
}


export default teamController;