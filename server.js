var express = require("express");
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment');
var _ = require("underscore");
var Meal = require('./models/meal.js');
var Cook = require('./models/cook.js');
var Cause = require('./models/cause.js');
var credentials = require('./utils/credentials.js');

var app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());

switch(app.get('env')){
    case 'production':
        mongoose.connect(credentials.production, credentials.opts);
        break;
    case 'development':
        mongoose.connect(credentials.development, credentials.opts);
        break;
    default:
        throw new Error('Unknown execution environment ' + app.get('env'));
}

app.get('/', function(req, res){
    res.json({message: "Welcome to the CooCook API !"});
});

app.get('/api/meals', function(req, res){
     //filter out with https://github.com/mccormicka/mongoosemask
     Meal.find({})
        .populate('cookedBy')
        .populate('cause')
        .exec(function(error, meals) {
            res.json(meals);
        });
});

app.post('/api/meals', function(req, res){
    console.log(req.body);
    var cook = new Cook({
        firstName: "Nicolas",
        lastName:"Bauwens"
    });
    cook.save();
    
    var cause = new Cause({
        name: "Rencontre des Continents",
        description: "ASBL",
        website: "http://www.rencontredescontinents.be"
    });
    cause.save();
    
    var meal = new Meal({
        name: "Boulettes végé",
        soldFrom: moment().toDate(),
        soldTo: moment("23/07/2015").toDate(),
        portions: 4,
        pricePerPortion: 3.5,
        ingredients: ["pois chiches", "carottes"],
        pickupLocation: "Forest Centre",
        cookedBy: cook._id,
        cause: cause._id
    });
    
    meal.save();
    
    /*req.assert('givenBy', 'GivenBy is required').notEmpty();
    req.assert('location_id', 'Location is required').notEmpty();
    req.assert('name', 'Name is required').notEmpty();
    req.assert('maxDate', 'Max date is required').notEmpty();
    req.assert('email', 'E-mail is required').notEmpty().isEmail();
    req.assert('foodType_id', 'Food type is required').notEmpty();

    var errors = req.validationErrors();
    console.log(errors);

    if(!errors) {
        new Giveaway({
            name: req.body.name,
            picture: req.body.picture,
            location_id: req.body.location_id,
          status: 0,
            maxConsumptionDate: moment(req.body.maxDate, "DD/MM/YYYY").toDate(),
            foodType_id: req.body.foodType_id,
            givenBy: {
                name: req.body.givenBy,
                email: req.body.email
            }
        }).save();
        res.json({message: "ok"});
    }else{
        res.json({message: "nok"});
    }*/
    res.json({message: "Data received"});

});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
   console.log('Express started on port ' + app.get('port')); 
});