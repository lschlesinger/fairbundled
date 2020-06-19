import express from 'express';
import CertificateController from '../controllers/certificate.controller';

const router = express.Router();

// get all certificates from external page
router.get('/',
    CertificateController.getCertificates
);

export default router;
