import Certificate from "../models/certificate.model";

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
