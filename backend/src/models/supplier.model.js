import mongoose from 'mongoose';

const Supplier = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    responsible: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    billingAddress: String,
    bankAccount: String,
}, {
    timestamps: true
});

export default mongoose.model('Supplier', Supplier);
