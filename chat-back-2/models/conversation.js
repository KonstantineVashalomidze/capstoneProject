const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  isPinned: {
    type: Boolean,
  },
  admins: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  mutedParticipants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      type: {
        type: String,
        enum: ["Text", "Media", "Document", "Link"],
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      text: {
        type: String,
      },
      file: {
        type: String,
      },
    },
  ],
});

const Conversation = new mongoose.model(
  "Conversation",
  conversationSchema
);
module.exports = Conversation;
