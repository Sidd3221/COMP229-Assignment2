import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { PassportLocalSchema } = mongoose;
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    username: String, 
    phone: Number, 
    password: String,
    email: String
}, {
    timestamps: true,
    collection: 'users'
});

LoginSchema.plugin(passportLocalMongoose);

export default mongoose.model('Login', LoginSchema);