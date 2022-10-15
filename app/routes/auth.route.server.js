// Filename: auth.route.server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022

// Importing router from express and the functions that render the website pages.
import { Router } from 'express';
import { displayLoginPage,  processLoginRequest, processLogoutRequest} from '../controllers/auth.controller.server.js';

const router = Router();

// Defining the routes and get/post requests to handle the user's login and logout requests
router.get('/login', displayLoginPage);
router.post('/login', processLoginRequest);
router.get('/logout', processLogoutRequest);

// Exporting router
export default router;