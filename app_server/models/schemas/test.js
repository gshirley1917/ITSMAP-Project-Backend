import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const testSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    }
});

export default testSchema;