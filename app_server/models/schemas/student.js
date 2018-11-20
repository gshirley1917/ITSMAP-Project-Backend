import mongoose from  'mongoose';
const Schema = mongoose.Schema;
import testSchema from './test'

const studentSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    division:{
        type: String,
        required: true
    },
    id:{
        type: String,
        requried: true
    },
    tests: [testSchema]
});

export default studentSchema;