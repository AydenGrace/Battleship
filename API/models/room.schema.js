const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    code: { type: String, required: true },
    status: { type: String, default: "pending" },
    maps: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
