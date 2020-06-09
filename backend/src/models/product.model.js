import mongoose from "mongoose";

const Product = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,
        ean: String,
        images: [String],
        deliveryDays: Number,
        priceLevel: [
            {
                unitPrice: Number,
                minQty: Number,
            },
        ],
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
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
    },
    {
        timestamps: true,
    }
);

Product.index({ name: "text" });

export default mongoose.model("Product", Product);
