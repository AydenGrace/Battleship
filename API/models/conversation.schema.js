const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
        default: [],
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
