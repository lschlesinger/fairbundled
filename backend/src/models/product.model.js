import mongoose from 'mongoose';

const Product = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    picture: String,
    deliveryDays: Number,
    priceLevel: [{
        unitPrice: Number,
        minQty: Number
    }],
    certificates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate'
    }],
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]

}, {
    timestamps: true
});

export default mongoose.model('Product', Product);
