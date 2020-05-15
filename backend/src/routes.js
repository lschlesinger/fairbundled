import express from 'express';
import product from './routes/product.routes';

const router = express.Router();

// define sub-routes in dedicated routes-files
router.use('/product', product);

export default router;
