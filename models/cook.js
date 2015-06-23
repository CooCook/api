var mongoose = require('mongoose');

var CookSchema = mongoose.Schema({
    firstName: String,
    lastName: String
});

var Cook = mongoose.model('Cook', CookSchema);
module.exports = Cook;