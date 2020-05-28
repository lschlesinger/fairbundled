import HttpService from "./HttpService";

export default class CategoryService {

    static BASE_URL = '/api/category';

    constructor() {
    }

    static async getCategories() {
        return HttpService.get(`${this.BASE_URL}/`);
    }
}
