import express from 'express';
import product from './routes/product.routes';
import auth from './routes/auth.routes';

const router = express.Router();

// define sub-routes in dedicated routes-files
router.use('/product', product);
router.use('/auth', auth);

export default router;
