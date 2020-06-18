import express from 'express';
import product from './routes/product.routes';
import auth from './routes/auth.routes';
import certificate from './routes/certificate.routes';
import category from './routes/category.routes';
import municipality from './routes/municipality.routes';
import supplier from './routes/supplier.routes';
import fairbundle from './routes/fairbundle.routes';
import order from './routes/order.routes';
import position from './routes/position/position.routes';

const router = express.Router();

// define sub-routes in dedicated routes-files
router.use('/product', product);
router.use('/auth', auth);
router.use('/certificate', certificate);
router.use('/category', category);
router.use('/supplier', supplier);
router.use('/municipality', municipality);
router.use('/fairbundle', fairbundle);
router.use('/order', order);
router.use('/position', position);

export default router;
