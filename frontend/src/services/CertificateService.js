import HttpService from "./HttpService";

export default class CertificateService {

    static BASE_URL = '/api/certificate';

    constructor() {
    }

    static async getCertificates() {
        return HttpService.get(`${this.BASE_URL}/`);
    }
}