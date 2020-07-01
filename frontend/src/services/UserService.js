import HttpService from "./HttpService";

export default class UserService {
    static BASE_URL = "/api/user";

    constructor() {}

    static async getEntityUsers() {
        return HttpService.get(`${this.BASE_URL}/`);
    }
}
