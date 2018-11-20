import mongoose from  'mongoose';
const Schema = mongoose.Schema;
import studentSchema from './student';

const teamSchema = new Schema({
    teamName: String,
    honorsStudents : [studentSchema],
    scholasticStudents : [studentSchema],
    varsityStudents : [studentSchema]
});

export default teamSchema;