import mongoose from 'mongoose';
import Product from './product.model';

const OrderPosition = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: {
            type: Number,
            min: 0,
            required: [true, 'Die Bestellmenge ist nicht gültig']
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: [true, 'Die Bestellposition ist keiner Bestellung zugeordnet']
        },

    }, {
        timestamps: true
    }
);

export default mongoose.model('OrderPosition', OrderPosition);
