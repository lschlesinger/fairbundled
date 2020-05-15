import mongoose from 'mongoose';

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
    comparePassword: function (password, cb) {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    }
});

export default mongoose.model('User', User);
