import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Define a schema
const ExcerciseSchema = new Schema({
  name: String,
  description: String,
  set: Number,
  duration: Number,
});

//Export model
export default ExcerciseSchema;