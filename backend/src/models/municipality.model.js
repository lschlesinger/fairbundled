import mongoose from 'mongoose';

const Municipality = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: String,
    responsible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    billingAddress: String,
    shippingAddress: String
}, {
    timestamps: true
});

export default mongoose.model('Municipality', Municipality);
