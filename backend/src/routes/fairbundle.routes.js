import express from 'express';
import FairbundleController from '../controllers/fairbundle.controller';
import middlewares from "../middlewares";
import Fairbundle from "../models/faribundle.model";

const router = express.Router();

// fairbundle routes
router.get('/', FairbundleController.getFairbundles);
router.post('/', middlewares.checkAuthentication, middlewares.checkMunicipality, FairbundleController.createFairbundle);
export default router;

