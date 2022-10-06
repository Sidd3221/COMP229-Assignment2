import { Router } from 'express';
import { DisplayLoginPage,  ProcessLoginPage, ProcessLogoutPage} from '../controllers/auth.controller.server.js';

const router = Router();

// Display Login Page
router.get('/login', DisplayLoginPage);
// Process Login Page
router.post('/login', ProcessLoginPage);
router.post('/list',ProcessLoginPage);

// Process Logout Page
router.get('/logout', ProcessLogoutPage);


export default router;