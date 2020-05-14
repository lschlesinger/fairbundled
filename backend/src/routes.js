import express from 'express';
import item from './routes/item.routes';

const router = express.Router();

// define sub-routes in dedicated routes-files
router.use('/item', item);

export default router;
