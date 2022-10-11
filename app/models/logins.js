// Filename: logins.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022

import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const { PassportLocalSchema } = mongoose;
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    username: String, 
    phone: Number, 
    password: String,
    email: String,
    displayName: String
}, {
    timestamps: true,
    collection: 'users'
});

LoginSchema.plugin(passportLocalMongoose);

export default mongoose.model('Login', LoginSchema);