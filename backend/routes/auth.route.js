import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.middleware.js';
import { authCheck, logout, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup)
router.get('login', signin)
router.post('/logout', logout)
router.get('/authCheck', protectRoute, authCheck)

export default router;