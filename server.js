// Filename: server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022

//Importing relevant express and passport modules
import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import session from "express-session";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';
import Login from './app/models/logins.js';
import mongoose from 'mongoose';
import { MongoURI, Secret } from './config/config.js';

// Declaring constants
const __dirname = dirname(fileURLToPath(import.meta.url));

let localStrategy = passportLocal.Strategy;

// Importing relevant routers
import indexRouter from './app/routes/index.route.server.js'
import listRouter from './app/routes/list.route.server.js';
import authRouter from './app/routes/auth.route.server.js';

const app = express();

// Connecting to Mongo Atlas database using Mongoose
mongoose.connect(MongoURI);
const db = mongoose.connection;

// Confirming if connection to MongoDB database was successful 
db.on('open', () => console.log("Connected to MongoDB"));
db.on('error', () => console.log("Mongo Connection Error"));

// Setting and requiring all express and passport modules to be used
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: Secret,
    saveUninitialized: false, 
    resave: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(Login.createStrategy());

//Serializing users 
passport.serializeUser(Login.serializeUser());
passport.deserializeUser(Login.deserializeUser());

// Using the router that was exported from index.route.server.js
app.use('/', indexRouter);
app.use('/', listRouter);
app.use('/', authRouter);

// Declaring the constants for the appropriate port to be used
const port = 3000;
app.listen(process.env.PORT || port,() => console.log(`Server started on port ${port}`));