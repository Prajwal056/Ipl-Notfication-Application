const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    timestamps: true,
    versionKey: false
};

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: String,
    email: { type: String, unique: true, required: true },
    phoneNumber: String,
    role: { type: String, default: 'admin' },
}, options);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
