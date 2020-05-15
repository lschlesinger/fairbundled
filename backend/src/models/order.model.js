import mongoose from 'mongoose';

const Order = new mongoose.Schema({
    positions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderPosition'
    }],
    submission: Date,
    municipality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipality'
    }

}, {
    timestamps: true
});


export default mongoose.model('Order', Order);
