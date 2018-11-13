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
    studentID:{
        type: Number,
        requried: true
    },
    tests: [testSchema]
});

export default studentSchema;