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
            validate: [quantityMinLimit, 'Die Menge der Bestellposition ist zu niedrig.']
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


function quantityMinLimit(val) {
    //TODO get smallest priceLevel quantity and set this as lower bound for orderPosition qty
    //const minQty = this.product.aggregate([{"$unwind": "priceLevel"}, {"$sort": {"minQty": -1}}])[0];
    return 0 < val;
}


export default mongoose.model('OrderPosition', OrderPosition);
