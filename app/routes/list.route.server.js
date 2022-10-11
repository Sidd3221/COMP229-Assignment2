// Filename: list.route.server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022


import { Router } from "express";
import { AuthGuard } from "../utils/index.js";

import { displayBusinessContactsList, displayUpdatePage, processUpdatePage, deleteLogin, processSearchRequest } from "../controllers/list.controller.server.js";

const router = Router();

router.get('/list', displayBusinessContactsList);
router.post('/update/:id', AuthGuard, processUpdatePage);

router.get('/update/:id', AuthGuard, displayUpdatePage);
router.get('/delete/:id', AuthGuard, deleteLogin);

router.post('/list', AuthGuard, processSearchRequest);

export default router;