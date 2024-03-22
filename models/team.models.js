const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    timestamps: true,
    versionKey: false
};

const teamSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    captain: { type: String, unique: true, required: true },
    coach: String,
    homeVenue: String,
    players: { type: [String], default: [] },
    createdByAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
}, options);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
