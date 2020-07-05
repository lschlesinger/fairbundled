import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    positions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderPosition'
    }],
    submission: Date,
    cancellation: Date,
    municipality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipality'
    }

}, {
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

export {
    OrderSchema,
    Order
};
