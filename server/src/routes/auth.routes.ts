import express from 'express';
import {
  loginUser,
  logout,
  refresh,
  registerUser,
} from '@controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', refresh);
router.get('/logout', logout);

export default router;
