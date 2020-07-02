import fetch from 'node-fetch';
import Certificate from "../models/certificate.model";

class CertificateService {

    static async createInitialCertificates() {
        return new Promise(((resolve, reject) => {
            // perform HTTP POST request to kompass-nachhaltigkeit REST API
            const payload = "{ getStandardsBy(productgroups: []) { name, url, description, logo, sector { name } } }";
            const url = "https://api.ssct-admin.de/public/gzf/data";
            fetch(url, {
                method: 'POST',
                body: payload
            })
                .then((res) => res.json())
                .then(async (json) => {
                    let sectors = {};
                    for (const i in json['data']['getStandardsBy']) {
                        const certificate = json['data']['getStandardsBy'][i];
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
                            sector: (sector === 'Rohstoffanbau (kleinbäuerl. Betriebe)') ? 'Rohstoffanbau (kleinbäuerl. Betriebe)' : sector
                        };
                        // update certificate and create if not exist (`upsert: true`)
                        await Certificate.findOneAndUpdate(cert, cert, {upsert: true});
                    }
                    resolve();
                    console.log("Initial Certificates created.");
                })
                .catch((err) => {
                    reject(err);
                });
        }));
    };

}

export default CertificateService;
