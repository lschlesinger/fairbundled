export default class ValidationError extends Error {

    errors;

    constructor(message, errors) {
        super(message);
        this.errors = errors;
    }
}
