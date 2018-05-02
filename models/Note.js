const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
let NoteSchema = new Schema({
  body: {
    type: String
  }
});

// Create the Note model with the NoteSchema
let Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;