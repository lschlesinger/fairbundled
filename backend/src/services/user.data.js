const USERS = [
    {
        email: "user_municipality@user.de",
        password: "passwort",
        municipality: {
            name: "München",
            state: "Bayern",
            shippingAddress: "Str. 34245",
            billingAddress: "Str. 3434"
        },
        supplier: null
    },
    {
        email: "user_supplier@user.de",
        password: "passwort",
        supplier: {
            name: "GreenTech",
            billingAddress: "Str. 34245",
            bankAccount: "IBAN DE 584930"
        },
        municipality: null
    }
];

export default USERS;
