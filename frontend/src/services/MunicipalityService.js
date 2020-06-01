import HttpService from "./HttpService";

export default class MunicipalityService {

    static BASE_URL = '/api/municipality';

    constructor() {
    }

    static async getMunicipalities() {
        return HttpService.get(`${this.BASE_URL}/`);
    }
}
