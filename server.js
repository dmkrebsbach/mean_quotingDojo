//BASIC SERVER & PROJECT SETUP
var express = require("express"); // Require the Express Module
var app = express(); // Create an Express App
var bodyParser = require("body-parser"); // Require body-parser (to receive post data from clients)
var flash = require('express-flash');
var path = require("path"); // Require path


app.use(express.static(__dirname + "./static")); // Setting our Static Folder Directory
app.set('views', path.join(__dirname, './views')); // Setting our Views Folder Directory
app.set('view engine', 'ejs'); // Setting our View Engine set to EJS
app.use(bodyParser.urlencoded()); // Integrate body-parser with our App

app.listen(8000, function() {console.log("listening on port 8000")}) // listening function for the app, port: localhost:8000;

//MONGOOSE SETUP
var mongoose = require('mongoose'); // Require the Mongoose
// ********************
mongoose.connect('mongodb://localhost/basic_quotingDojo'); // change basic_mongoose to new project database name in the future
// ********************

var Schema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 2},
	quote: {type: String, required: true, minlength: 5}
},
{timestamps: true});

mongoose.model('Quote', Schema);
var Quote = mongoose.model('Quote')

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/quotes', function(req, res) {
    Quote.find({},function(err,quotes){
        console.log(quotes)
        if(err)
            console.log("Error matching DB request")
        else
            res.render('quotes', {all_quotes:quotes});
    }).sort({_id:-1});
});

app.post('/quotes', function(req, res) {
    var new_quote = new Quote({
    	name: req.body.name,
    	quote: req.body.quote
    });
    new_quote.save(function(err){
    	if(err)
    		errors = err;
    });
    Quote.find({},function(err,quotes){
        if(err)
            console.log("Error matching DB request")
        else
            res.redirect('/quotes'); //url path after localhost:8000, moves to app.get('/quotes')
    }).sort({_id:-1});
})