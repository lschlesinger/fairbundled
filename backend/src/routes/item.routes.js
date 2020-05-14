import express from 'express';
import ItemController from '../controllers/item.controller';

const router = express.Router();

// item routes
router.get('/', ItemController.getItems);
router.post('/', ItemController.createItem);

export default router;
