import express from 'express';
import ProductController from '../controllers/product.controller';
import middlewares from "../middlewares";

const router = express.Router();

// product routes
router.get('/', ProductController.getProducts);
router.post('/', middlewares.checkAuthentication, middlewares.checkSupplier, ProductController.createProduct);
router.get('/:id', ProductController.getProduct);

export default router;

