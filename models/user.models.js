const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    timestamps: true,
    versionKey: false, // Changed to versionKey from mongoose.versionKey
};

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    subscriptions: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teams' }], default: [] },
}, options);


const User = mongoose.model('User', userSchema);

module.exports = User;

