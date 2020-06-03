import mongoose from "mongoose";

const FAIRBUNDLES = [
    {
        expiration: '2020-10-01T17:00:00',
        expirationAction: "Cancel",
        targetPrice: 50,
        bundlers: [{
            name: "München",
            state: "Bayern",
            shippingAddress: "Str. 34245",
            billingAddress: "Str. 3434"
        }],
        product: "Feuerwehr Uniform HotStuff"
    }
];

export default FAIRBUNDLES;
