// Filename: index.controller.server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022

// Importing function that displays user's display name when logged in
import { displayUserName } from '../utils/index.js';

// Rendering home page
export function homePage(req, res, next) {
    res.render('template', { title: 'Welcome to my portfolio!', page: 'home', displayName: displayUserName(req)});
};

// Rendering About Me page
export function aboutPage(req, res, next) {
    res.render('template', { title: 'About Me', page: 'about', displayName: displayUserName(req)});
};

// Rendering My Services page
export function servicesPage(req, res, next) {
    res.render('template', { title: 'My Services', page: 'services', displayName: displayUserName(req)});
};

// Rendering Contact Me page
export function contactPage(req, res, next) {
    res.render('template', { title: 'Contact Me!', page: 'contact', displayName: displayUserName(req)});
};

// Rendering Projects page
export function projectsPage(req, res, next) {
    res.render('template', { title: 'My Projects', page: 'projects', displayName: displayUserName(req)});
};
