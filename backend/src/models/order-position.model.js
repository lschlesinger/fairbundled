import mongoose from 'mongoose';

const OrderPosition = new mongoose.Schema({
    qty: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },

}, {
    timestamps: true
});


export default mongoose.model('OrderPosition', OrderPosition);
