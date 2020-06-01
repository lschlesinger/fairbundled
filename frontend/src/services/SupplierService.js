import HttpService from "./HttpService";

export default class SupplierService {

    static BASE_URL = '/api/supplier';

    constructor() {
    }

    static async getSuppliers() {
        return HttpService.get(`${this.BASE_URL}/`);
    }
}
