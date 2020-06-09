import mongoose from 'mongoose';
import {OrderSchema} from './order.model';
import extendSchema from 'mongoose-extend-schema';

const Fairbundle = extendSchema(OrderSchema, {
    expiration: Date,
    expirationAction: {
        type: String,
        enum: ['force','cancel'],
        default: 'force'
    },
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
