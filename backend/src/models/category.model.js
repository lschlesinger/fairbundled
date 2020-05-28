import mongoose from 'mongoose';

const Category = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    root: Boolean,
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],

}, {
    timestamps: true
});

export default mongoose.model('Category', Category);
