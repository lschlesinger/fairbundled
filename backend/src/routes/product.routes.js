import express from 'express';
import ProductController from '../controllers/product.controller';

const router = express.Router();

// product routes
router.get('/', ProductController.getProducts);
router.post('/', ProductController.createProduct);

export default router;
