import express from 'express';
import CertificateController from '../controllers/certificate.controller';

const router = express.Router();

router.get('/', CertificateController.getCertificates);

export default router;
