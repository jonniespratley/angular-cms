var mongoose = require( 'mongoose' );


module.exports = mongoose.model( 'Upload', mongoose.Schema( {
  name: String,
  filename: String,
  size: Number,
  url: String,
  type: String,
  path: String,
  meta: Object,
  created: Date,
  updated: Date
} ) );
