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
import indexRouter from './app/routes/index.route.server.js';

// Declaring constants
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

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

//Using the router that was exported from index.route.server.js
app.use('/', indexRouter);

// Declaring the constants for the appropriate port to be used
const port = 3000;
app.listen(process.env.PORT || port,() => console.log(`Server started on port ${port}`));