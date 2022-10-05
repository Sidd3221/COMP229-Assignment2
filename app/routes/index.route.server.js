// Filename: index.route.server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: Sep 19, 2022

// Importing router from express and the functions that render the website pages.

import { Router } from "express";
import { homePage, aboutPage, servicesPage, contactPage, projectsPage } from "../controllers/index.controller.server.js";

const router = Router();

//Defining the routes for all webpages. These are the routes/URLs that can be used to navigate to different pages of the website 
router.get('/', homePage);
router.get('/home', homePage);
router.get('/about', aboutPage);
router.get('/contact', contactPage);
router.get('/projects', projectsPage);
router.get('/services', servicesPage);

// Exporting router
export default router;