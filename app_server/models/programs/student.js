import mongoose from  'mongoose';
import studentSchema from  '../schemas/student';
import testSchema from '../schemas/test';
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

studentSchema.methods.addNewTest = function(testName, testScore) {
    for(i = 0; i < this.tests.length; i++){
        if(tesName == this.tests[i].name){
            return;
        }
    }

    var newTest = new testSchema;
    newTest.name = testName;
    newTest.score = testScore;

    this.tests.add(newTest);
}

studentSchema.methods.updateTest = function(testName, newScore) {
    var found = -1;
    for(i = 0; i < this.tests.length; i++){
        if(testName == this.tests[i].name){
            found = i;
            break;
        }
    }
    if(found != -1){
        this.tests[found].score = newScore;
    }
    return;
}

studentSchema.methods.getTotalScore = function(){
    var score = 0;
    for(i = 0; i < this.tests.length; i++){
        score += this.tests[i].score;
    }
    return score;
}

studentSchema.plugin(MongooseAutoIncrementID.plugin, {
    modelName : 'studentProgram'
});

let studentProgram = mongoose.model('studentProgram', studentSchema);

export default studentProgram;