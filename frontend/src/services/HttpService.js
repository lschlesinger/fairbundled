/**
 * Defines the main HTTP service.
 * Error handling is supposed to be done by callers of the service.
 * ```
 * try {
 *     let res = await HttpService.get("some-url");
 * } catch (err) {
 *     console.log(`OMG, I failed because of: ${err}`);
 * }
 * ```
 */
import TokenService from "./TokenService";
import AuthService from "./AuthService";

export default class HttpService {
    constructor() {
    }

    static async get(url) {
        const headers = this.getDefaultHeaders();
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        return this.parseResponse(response);
    }

    static async post(url, body) {
        const headers = this.getDefaultHeaders();
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
        return this.parseResponse(response);
    }

    static async put(url, body) {
        const headers = this.getDefaultHeaders();
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        });
        return this.parseResponse(response);
    }

    static async delete(url) {
        const headers = this.getDefaultHeaders();
        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers
        });
        return this.parseResponse(response);
    }

    /**
     * Parses HTTP response to JSON if did not receive 401 status code (unauthorized)
     * @returns {Promise<void>}
     */
    static async parseResponse(response) {
        if (response.status === 401) {
            AuthService.logout();
            throw new Error("Unauthorized request.");
        } else {
            return response.json();
        }
    }

    /**
     * Provides headers reused in each HTTP request
     * @returns {Headers}
     */
    static getDefaultHeaders() {
        const headers = new Headers();
        // add authorization header
        const token = TokenService.getToken();
        if (token && token.exp && new Date(token.exp * 1000) < new Date()) {
            AuthService.logout();
            throw new Error("Token expired.");
        } else if (token) {
            headers.append('Authorization', `Bearer ${token}`);
        }
        // add content-type header
        headers.append('Content-Type', 'application/json');

        return headers;
    }
}
