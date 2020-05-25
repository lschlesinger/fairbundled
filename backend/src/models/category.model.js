import mongoose from 'mongoose';

const Category = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],

}, {
    timestamps: true
});

export default mongoose.model('Category', Category);
