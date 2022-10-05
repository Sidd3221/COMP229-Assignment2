// Filename: server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: Sep 19, 2022

//Importing modules
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import session from "express-session";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Secret } from './config/config.js';


// Declaring constants
const __dirname = dirname(fileURLToPath(import.meta.url));


// Auth Step 1 - import modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

// Auth Step 2 - defien our auth strategy
let localStrategy = passportLocal.Strategy;

// Auth Step 3 - import the user model
import User from './models/user.js';

// Import Mongoose Module
import mongoose from 'mongoose';

// Configuration Module
import { MongoURI, Secret } from '../config/config.js';

import indexRouter from './routes/index.route.server.js'
import movieRouter from './routes/movies.route.server.js';
import authRouter from './routes/auth.route.server.js';

const app = express();

mongoose.connect(MongoURI);
const db = mongoose.connection;

//Listen for connection success or error
db.on('open', () => console.log("Connected to MongoDB"));
db.on('error', () => console.log("Mongo Connection Error"));

//Setting view engine and using modules 
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname,'/public')));
app.use(session({
    secret: Secret,
    saveUninitialized: false, 
    resave: false
}));

app.use(flash());

// Auth Step 6 - Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

// Auth Step 8 - Setup serialization and deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Using the router that was exported from index.route.server.js
app.use('/', indexRouter);

// Declaring the constants for the appropriate port to be used
const port = 3000;
app.listen(process.env.PORT || port,() => console.log(`Server started on port ${port}`));