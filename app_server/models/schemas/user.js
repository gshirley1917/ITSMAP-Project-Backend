import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    firstName: {
        type: String,
        required: true
    },
    surName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    hash: String,
    salt: String,
});

export default userSchema;
