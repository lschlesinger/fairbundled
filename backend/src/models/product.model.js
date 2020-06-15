import mongoose from "mongoose";

const Product = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Es wurde kein Produktname angegeben.']
        },
        description: String,
        ean: String,
        images: [String],
        deliveryDays: {
            type: Number,
            required: [true, 'Es wurde kein Lieferzeitraum angegeben.']
        },
        priceLevel: {
            type: [{
                unitPrice: Number,
                unit: String,
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

export default mongoose.model("Product", Product);
