import mongoose from 'mongoose';

const Item = new mongoose.Schema({
    name: {
        type: String,
    }
}, {
    timestamps: true
});

export default mongoose.model('Item', Item);
