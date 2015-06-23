var mongoose = require('mongoose');

var MealSchema = mongoose.Schema({
    name: String,
    soldFrom: { type: Date, default: Date.now },
    soldTo: { type: Date, default: Date.now },
    portions: Number,
    pricePerPortion: Number,
    ingredients: [String],
    pickupLocation: String,
    cookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cook'
    },
    cause: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cause'
    }
    
});

var Meal = mongoose.model('Meal', MealSchema);
module.exports = Meal;