import express from 'express';
import FairbundleController from '../controllers/fairbundle.controller';
import middlewares from "../middlewares";

const router = express.Router();

// fairbundle routes
router.get('/', FairbundleController.getFairbundles);
router.get('/?product=:id', FairbundleController.getFairbundles);
router.post('/', middlewares.checkAuthentication, middlewares.checkMunicipality, FairbundleController.createFairbundle);
router.put('/:id', middlewares.checkAuthentication, middlewares.checkMunicipality, FairbundleController.joinFairbundle);
export default router;

