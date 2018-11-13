import mongoose from 'mongoose';
import ExcerciseSchema from './excercise';
const Schema = mongoose.Schema;

//Define a schema
const WorkoutProgramSchema = new Schema({
  name: String,
  excercises : [ExcerciseSchema],
});

const workoutLogSchema = new Schema({
    date : Date,
    workout : WorkoutProgramSchema
});

export default workoutLogSchema;