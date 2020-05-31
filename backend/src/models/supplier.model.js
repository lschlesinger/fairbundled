import mongoose from 'mongoose';

// note: responsible was deleted as not required
const Supplier = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    billingAddress: String,
    bankAccount: String,
}, {
    timestamps: true
});

export default mongoose.model('Supplier', Supplier);
