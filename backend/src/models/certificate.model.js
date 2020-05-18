import mongoose from 'mongoose';

const Certificate = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    url: String,
    description: String,
    logo: String,
    sector: String
}, {
    timestamps: true
});

export default mongoose.model('Certificate', Certificate);
