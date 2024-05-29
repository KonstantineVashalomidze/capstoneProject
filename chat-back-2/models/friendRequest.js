const mongoose = require("mongoose");

const friendRequestSchema= new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  sentAt: {
    type: Date,
    default: Date.now(),
  },
  recipient: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  receivedAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const FriendRequest = new mongoose.model("FriendRequest", friendRequestSchema);
module.exports = FriendRequest;
