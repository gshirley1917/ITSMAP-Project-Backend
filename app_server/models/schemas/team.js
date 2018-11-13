const Schema = mongoose.Schema;
import studentSchema from './student';

const teamSchema = new Schema({
    teamName:{
        type: String,
        required: true
    },
    students: [studentSchema]
});

export default teamSchema;