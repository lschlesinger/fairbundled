import Certificate from "../models/certificate.model";
import CertificateService from "../services/certificate.service";

// do this once when this file is loaded
CertificateService.fetchCertificates();

class CertificateController {
    static getCertificates(req, res) {
        Certificate.find({})
            .then((certificates) => {
                res.status(200).json(certificates);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default CertificateController;
