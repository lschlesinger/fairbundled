import mongoose from 'mongoose';

// note: responsible was deleted as not required
const Municipality = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: String,
    billingAddress: String,
    shippingAddress: String
}, {
    timestamps: true
});

export default mongoose.model('Municipality', Municipality);
