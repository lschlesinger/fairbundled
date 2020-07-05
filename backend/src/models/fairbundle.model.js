import mongoose from 'mongoose';
import {Order} from './order.model';

let options = {discriminatorKey: 'kind'};

const Fairbundle = Order.discriminator('Fairbundle', new mongoose.Schema({
        expiration: Date,
        expirationAction: {
            type: String,
            enum: ['force', 'cancel'],
            default: 'force'
        },
        targetPrice: Number,
        finalUnitPrice: Number,
        finalReachedQty: Number,
        bundlers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Municipality'
        }],
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }, options)
);


export default Fairbundle;
