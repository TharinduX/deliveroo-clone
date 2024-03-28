import express from 'express';
import {
  googleLogin,
  loginUser,
  logout,
  refresh,
  registerUser,
} from '@controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.get('/refresh', refresh);
router.get('/logout', logout);

export default router;
