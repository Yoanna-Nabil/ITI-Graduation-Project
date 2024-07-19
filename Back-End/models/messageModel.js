const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    converstionId: { type: mongoose.Schema.Types.ObjectId, ref: "converstion" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, default: "" },
  },
  { timestamps: true }
);

const message = mongoose.model("message", messageSchema);
module.exports = message;
