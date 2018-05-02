const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  date: String,
  saved: {
    type: Boolean,
    default: false
  },
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

let Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;