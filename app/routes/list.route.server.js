import { Router } from "express";
import { AuthGuard } from "../utils/index.js";

import { displayBusinessContactsList, displayUpdatePage, processUpdatePage, deleteLogin } from "../controllers/list.controller.server.js";

const router = Router();

router.get('/list', displayBusinessContactsList);
router.post('/update/:id', AuthGuard, processUpdatePage);
router.get('/update/:id', AuthGuard, displayUpdatePage);
router.get('/delete/:id', AuthGuard, deleteLogin);

export default router;