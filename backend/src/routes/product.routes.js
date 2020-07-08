import express from 'express';
import ProductController from '../controllers/product.controller';
import middlewares from "../middlewares";

const router = express.Router();

// get all products, with optional query /?category=CategoryId ?searchString="..." get all products that match the user query
router.get('/',
    ProductController.getProducts
);

// get one product by productId
router.get('/:id',
    ProductController.getProduct
);

// create a product as supplier
router.post('/',
    middlewares.checkAuthentication,
    middlewares.checkSupplier,
    ProductController.createProduct
);

// "Mock" Endpoint for making ant image upload work smoothly
router.post('/image',
    ProductController.uploadImage
);

export default router;

