import fetch from 'node-fetch';
import Certificate from "../models/certificate.model";

class CertificateService {

    static fetchCertificates() {
        // perform HTTP POST request to kompass-nachhaltigkeit REST API
        const payload = "{ getStandardsBy(productgroups: []) { name, url, description, logo, sector { name } } }";
        const url = "https://api.ssct-admin.de/public/gzf/data";
        fetch(url, {
            method: 'POST',
            body: payload
        })
            .then((res) => res.json())
            .then((json) => {
                let sectors = {};
                json['data']['getStandardsBy'].forEach((certificate) => {
                    // pick german name and description for certificate
                    const sector = certificate.sector.name.de;
                    if (!(sector in sectors)) {
                        sectors[sector] = 0;
                    }
                    sectors[sector]++;
                    const cert = {
                        name: certificate.name.de,
                        description: certificate.description.de,
                        url: certificate.url,
                        logo: certificate.logo,
                        sector: sector
                    };
                    // update certificate and create if not exist (`upsert: true`)
                    Certificate.findOneAndUpdate(cert, cert, {upsert: true})
                        .then((res) => {
                            //console.log(res);
                        })
                        .catch((err) => {
                            //console.log(err);
                        });
                });
                console.log(sectors);
            })
            .catch((err) => {
                console.log(err);
            });

    };
}

export default CertificateService;
