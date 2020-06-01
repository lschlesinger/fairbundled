import express from 'express';
import SupplierController from "../controllers/supplier.controller";

const router = express.Router();

router.get('/', SupplierController.getSuppliers);

export default router;
