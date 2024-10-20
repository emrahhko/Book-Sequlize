import express from 'express';

const router = express.Router();

import userControllers from '../controllers/user.js';

const { getRegisterForm, register, getLoginForm, login, logout } =
    userControllers;

// routes

router.get('/register', getRegisterForm);
router.post('/register', register);
router.get('/login', getLoginForm);
router.post('/login', login);
router.get('/logout', logout);

export default router;
