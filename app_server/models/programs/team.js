import mongoose from  'mongoose';
import teamSchema from  '../schemas/team';
import studentSchema from '../schemas/student';
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

teamSchema.methods.addStudent = function(firstName, lastName, division){
    if(division == "honors"){
        if(this.honorsStudents.length > 3){
            return;
        }
        var newStudent = new studentSchema;
        newStudent.firstName = firstName;
        newStudent.lastName = lastName;
        newStudent.division = division;
        this.honorsStudents.add(newStudent);
    }
    if(division == "scholastic"){
        if(this.scholasticStudents.length > 3){
            return;
        }
        var newStudent = new studentSchema;
        newStudent.firstName = firstName;
        newStudent.lastName = lastName;
        newStudent.division = division;
        this.scholasticStudents.add(newStudent);
    }
    if(division == "varsity"){
        if(this.varsityStudents.length > 3){
            return;
        }
        var newStudent = new studentSchema;
        newStudent.firstName = firstName;
        newStudent.lastName = lastName;
        newStudent.division = division;
        this.scholasticStudents.add(newStudent);
    }
    return;
}

teamSchema.methods.getTeamScore = function() {
    
}

teamSchema.plugin(MongooseAutoIncrementID.plugin, {
    modelName : 'teamProgram',
});

let teamProgram = mongoose.model('teamProgram', teamSchema);

export default teamProgram;