export default class TokenService {

    static TOKEN_KEY = 'jwtToken';

    constructor() {
    }

    /**
     * Provides JWT token from browser's localStorage
     * @returns {any}
     */
    static getToken() {
        return window.localStorage[this.TOKEN_KEY];
    }

    /**
     * Store JWT token into browser's localStorage
     */
    static setToken(token) {
        window.localStorage[this.TOKEN_KEY] = token;
    }

    /**
     * Remove JWT token from browser's localStorage
     */
    static removeToken() {
        window.localStorage.removeItem(this.TOKEN_KEY);
    }
}
