import HttpService from "./HttpService";

export default class UserService {
    static BASE_URL = "/api/user";

    constructor() {}

    static async getUsersBySupplierId(supplierId) {
        return HttpService.get(`${this.BASE_URL}/${supplierId}`);
    }
}
