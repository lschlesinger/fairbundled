import express from 'express';
import product from './routes/product.routes';
import auth from './routes/auth.routes';
import certificate from './routes/certificate.routes';
import category from './routes/category.routes';

const router = express.Router();

// define sub-routes in dedicated routes-files
router.use('/product', product);
router.use('/auth', auth);
router.use('/certificate', certificate);
router.use('/category', category);

export default router;
