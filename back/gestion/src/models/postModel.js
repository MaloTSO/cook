//Model pour un post

const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
      posterId: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true,
        trim : true,
        maxlength : 500,
      },
      picture: {
        type : String,
      },
      video : {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      likers: {
        type : [String],
        required : true,
      },
      comment: {
        
        type: [{
          posterId : String,
          text: String,
          date: {
            type: Date,
            default: Date.now(),
          },
        }],
        required : true,
      },
      },
      {
        timestamps: true,
      }

);

const PostModel = mongoose.model('post', PostSchema);
module.exports = PostModel;

