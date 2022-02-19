const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  comment: {
    type: String
  },
  photo: {
    type: String
  },
}, {
    collection: 'Photos'
  })

module.exports = mongoose.model('Photos', userSchema)
