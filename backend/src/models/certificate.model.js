import mongoose from 'mongoose';

const Certificate = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    logo: String,

}, {
    timestamps: true
});

export default mongoose.model('Certificate', Certificate);
