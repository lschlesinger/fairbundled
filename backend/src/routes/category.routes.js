import express from 'express';
import CategoryController from '../controllers/category.controller';

const router = express.Router();

router.get('/', CategoryController.getCategories);

export default router;
