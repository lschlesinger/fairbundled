import HttpService from "./HttpService";

export default class CertificateService {

    static BASE_URL = '/api/certificate';

    constructor() {
    }

    static async getCertificates() {
        return HttpService.get(`${this.BASE_URL}/`);
    }

    static getCertificateCategoryMapping(categories, certificates) {
        const mappedCertificates = [];
        const sectorCertificates = {
            "Waschmittel": ['Hygiene & Haushalt'],
            "Papierproduktion": ['Holz & Holzprodukte', 'Bürobedarf'],
            "Rohstoffanbau": ['Holz & Holzprodukte', 'Textilien'],
            "Laptops": ['IT & Zubehör', 'Bürobedarf', 'Straße & Verkehr'],
            "Textilproduktion": ['Textilien'],
            "Naturstein": ['Straße & Verkehr', 'Bauhof'],
            "Leder": ['Sport', 'Textilien'],
            "Mobiltelefone": ['IT & Zubehör', 'Bürobedarf']
        };
        for (const c in certificates) {
            const certificate = certificates[c];
            let certCategoryIds = [];
            const certCategoryNames = sectorCertificates[certificate.sector];
            for (const n in certCategoryNames) {
                const name = certCategoryNames[n];
                let id = this.getCategoryId(name, categories);
                certCategoryIds.push(id);
            }
            certificate.categories = certCategoryIds;
            mappedCertificates.push(certificate);
        }
        return mappedCertificates;
    }

    static getCategoryId(name, categories) {
        //get object_ids instead of names
        for (const c in categories) {
            const category = categories[c];
            if (category.name === name) {
                return category._id;
            }
        }
    }
}
