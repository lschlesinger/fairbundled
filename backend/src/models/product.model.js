import mongoose from "mongoose";

const Product = new mongoose.Schema(
    {
        name: {
            type: String,
            validate: [valueExistance, 'Es wurde kein Produktname angegeben.']
        },
        description: String,
        ean: String,
        images: [String],
        deliveryDays: {
            type: Number,
            validate: [valueExistance, 'Es wurde kein Lieferzeitraum angegeben.']
        },
        priceLevel: {
            type: [{
                unitPrice: Number,
                unit: {
                    type: String,
                    enum: ['m²', 'Liter', 'Kilogramm', 'Gramm', 'Packeinheit', 'Stück'],
                    default: 'Stück'
                },
                minQty: Number,
            }],
            validate: [priceLevelExistance, 'Es wurde keine Preisstufe festgelegt.']
        },
        certificates: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Certificate",
            },
        ],
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
        },
        categories: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            }],
            validate: [categoryArrayLimit, 'Die Anzahl an Kategorien liegt nicht zwischen 1 und 5.']
        },
    },
    {
        timestamps: true,
    }
);

function categoryArrayLimit(val) {
    return val.length <= 5 && val.length > 0;
}

function priceLevelExistance(val) {
    return val.length > 0;
}

function valueExistance(val) {
    return !val;
}

export default mongoose.model("Product", Product);
