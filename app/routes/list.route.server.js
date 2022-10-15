// Filename: list.route.server.js
// Student Name: Siddharth Verma
// Student ID: 301207026
// Date: October 1, 2022

// Importing router from express and the functions that allow for secure rendering of the website pages.
import { Router } from "express";
import { AuthGuard } from "../utils/index.js";
import { displayContactList, displayUpdatePage, processDeleteRequest, processSearchRequest, processUpdateRequest } from "../controllers/list.controller.server.js";

const router = Router();

// Defining the routes and get/post requests to display the contacts list and handle the user's requests if they want to delete, search or update an entry in the list.
router.get('/list', displayContactList);
router.get('/update', AuthGuard, displayContactList);
router.get('/delete', AuthGuard, displayContactList);
router.post('/update/:id', AuthGuard, processUpdateRequest);
router.get('/update/:id', AuthGuard, displayUpdatePage);
router.get('/delete/:id', AuthGuard, processDeleteRequest);
router.post('/list', AuthGuard, processSearchRequest);

// Exporting router
export default router;