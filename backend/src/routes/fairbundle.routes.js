import express from 'express';
import FairbundleController from '../controllers/fairbundle.controller';
import middlewares from "../middlewares";

const router = express.Router();

// get all fairbundles, with optional query /?product=productId get all fairbundles for a certain product
router.get('/',
    FairbundleController.getFairbundles
);

// get one fairbundle by fairbundleId
router.get('/:id',
    FairbundleController.getFairbundle
);

// create one fairbundle as municipality
router.post('/',
    middlewares.checkAuthentication,
    middlewares.checkMunicipality,
    FairbundleController.createFairbundle
);

// join one fairbundle as municipality
router.put('/:id',
    middlewares.checkAuthentication,
    middlewares.checkMunicipality,
    FairbundleController.joinFairbundle
);

export default router;

