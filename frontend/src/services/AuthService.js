import HttpService from './HttpService';
import TokenService from "./TokenService";

export default class AuthService {

    static BASE_URL = '/api/auth';

    constructor() {
    }

    static async register(email, password, municipality, supplier) {
        try {
            await HttpService.post(`${this.BASE_URL}/register`, {email, password, municipality, supplier});
        } catch (error) {
            throw new Error("Signup failed.");
        }
    }

    static async login(email, password) {
        try {
            const res = await HttpService.post(`${this.BASE_URL}/login`, {email, password});
            if (res.token) {
                TokenService.setToken(res.token);
            } else {
                throw new Error("Login failed.");
            }
        } catch (error) {
            throw new Error("Login failed.");
        }
    }

    static logout() {
        window.localStorage.removeItem('jwtToken');
        window.location = '/';
    }

    static isAuthenticated() {
        // !! will return true if the expression is not-null
        return !!TokenService.getToken();
    }

    static isAuthenticatedMunicipality() {
        return !!this.getCurrentUser().municipality;
    }

    static isAuthenticatedSupplier() {
        return !!this.getCurrentUser().supplier;
    }

    static getCurrentUser() {
        const token = TokenService.getToken();
        if (!token) return {};

        const base64Payload = token.split('.')[1];
        const base64 = base64Payload.replace('-', '+').replace('_', '/');
        const user = JSON.parse(this.decodeBase64ToUtf8(base64));
        return {
            id: user.id,
            email: user.email,
            municipality: user.municipality || null,
            supplier: user.supplier || null
        };
    }

    static decodeBase64ToUtf8(base64) {
        return decodeURIComponent(window.atob(base64)
            .split('')
            .map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''));
    }

    static getEntityName() {
        let user = this.getCurrentUser();
        if (user.municipality) {
            return user.municipality.name;
        } else if (user.supplier) {
            return user.supplier.name;
        } else {
            return "";
        }
    }
}
