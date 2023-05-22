import { Router } from "express";
import { loggin, register } from "../controllers/user.controller";

const router = Router();
router.post('/login', loggin);
router.post('/register',register);

export default router;