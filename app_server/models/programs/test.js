import testSchema from '../schemas/test';
import mongoose from 'mongoose';
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';

testSchema.plugin(MongooseAutoIncrementID.plugin, {
    modelName : 'testProgram'
});

let testProgram = mongoose.model('testProgram', testSchema);

export default testProgram;