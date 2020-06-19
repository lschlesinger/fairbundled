import HttpService from "./HttpService";

export default class PositionService {
    static BASE_URL = "/api/position";

    constructor() {}

    static async getPositions() {
        return HttpService.get(`${this.BASE_URL}/`);
    }
}
