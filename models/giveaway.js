var mongoose = require('mongoose');

var giveawaySchema = mongoose.Schema({
    name: String,
    picture: String,
    location_id: String,
    status: Number,
    maxConsumptionDate: { type: Date, default: Date.now },
    addedOn: { type: Date, default: Date.now },
    foodType_id: String,
    givenBy: {
        name: String,
        email: String
    },
    givenOn: { type: Date }
});

var Giveaway = mongoose.model('Giveaway', giveawaySchema);
module.exports = Giveaway;