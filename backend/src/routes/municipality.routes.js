import express from 'express';
import MunicipalityController from "../controllers/municipality.controller";

const router = express.Router();

// get all municipalities
router.get('/',
    MunicipalityController.getMunicipalities
);

export default router;
