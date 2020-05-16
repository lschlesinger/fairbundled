import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const User = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // during user registration user has to link account to either supplier or to municipality
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    municipality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipality'
    }

}, {
    timestamps: true
});

// define method on user objects which allows password comparison with bcrypt
User.method({
    comparePassword: function (password) {
        return bcrypt.compareSync(password, this.password);
    }
});

export default mongoose.model('User', User);
