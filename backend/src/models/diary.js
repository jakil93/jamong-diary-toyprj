const mongoose = require("mongoose");
const { Schema } = mongoose;

const Diary = new Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Account"
  }
});

module.exports = mongoose.model("Diary", Diary);
