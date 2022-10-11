// Filename: auth.route.server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022


import { Router } from 'express';
import { displayLoginPage,  processLoginPage, processLogoutPage} from '../controllers/auth.controller.server.js';

const router = Router();

// Display Login Page
router.get('/login', displayLoginPage);

// Process Login Page
router.post('/login', processLoginPage);
// router.post('/list',processLoginPage);

// Process Logout Page
router.get('/logout', processLogoutPage);


export default router;