import express from 'express';
import MunicipalityController from "../controllers/municipality.controller";

const router = express.Router();

// authentication routes
router.get('/', MunicipalityController.getMunicipalities);

export default router;
