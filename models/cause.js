var mongoose = require('mongoose');

var CauseSchema = mongoose.Schema({
    name: String,
    description: String,
    website: String
});

var Cause = mongoose.model('Cause', CauseSchema);
module.exports = Cause;