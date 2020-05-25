import mongoose from 'mongoose';
import Order from './order.model';

const Fairbundle = new mongoose.Schema({
    ...Order.obj,
    expiration: Date,
    expirationAction: String,
    targetPrice: Number,
    bundlers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipality'
    }],
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }

}, {
    timestamps: true
});


export default mongoose.model('Fairbundle', Fairbundle);
