var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
const Note = require("./models/Note.js");
const Article = require("./models/Article.js");

mongoose.Promise = Promise;

// Initialize Express
let app = express();

// Use body parser with our app
app.use(bodyParser.urlencoded({
   extended: false
}));

// Make public a static dir
app.use(express.static(process.cwd() + "/public"));

// Database configuration with mongoose
let databaseUri = "mongodb://localhost/savedarticlesmongo";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}

let db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection sucessful.");
});

//set engine and default for handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
let router = express.Router();

// Require routes file pass router object
require("./config/routes")(router);

// Have every request go through router middlewar
app.use(router);

//set port
let port = process.env.PORT || 3001;

//setup listener
app.listen(port, function() {
  console.log("app running on port " + port);
});