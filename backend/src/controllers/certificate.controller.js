import Certificate from "../models/certificate.model";
import CertificateService from "../services/certificate.service";

// do this once when this file is loaded
CertificateService.fetchCertificates();

class CertificateController {
    static getCertificates(req, res) {
        Certificate.find({})
            .then((products) => {
                res.status(200).json(products);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    }
}

export default CertificateController;
