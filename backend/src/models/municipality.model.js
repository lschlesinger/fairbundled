import mongoose from 'mongoose';

// note: responsible was deleted as not required
const Municipality = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: String,
    billingAddress: {
        type: String,
        required: true
    },
    shippingAddress: String
}, {
    timestamps: true
});

export default mongoose.model('Municipality', Municipality);
