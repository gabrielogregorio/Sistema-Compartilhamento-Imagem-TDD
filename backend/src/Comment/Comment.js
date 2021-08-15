let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
  text: {
    type: String,
 },
 replie: this,
 replies: [this],
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})



var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
