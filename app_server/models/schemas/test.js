const Schema = mongoose.Schema;

const testSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    score:{
        type: Decimal128,
        required: true
    }
});

export default testSchema;