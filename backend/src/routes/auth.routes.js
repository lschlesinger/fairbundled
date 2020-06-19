import express from 'express';
import AuthController from '../controllers/auth.controller';

const router = express.Router();

// login user
router.post('/login',
    AuthController.login
);

// register user
router.post('/register',
    AuthController.register
);

export default router;
