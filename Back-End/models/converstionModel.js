const mongoose = require("mongoose");
const converstionSchema = new mongoose.Schema(
  {
    participations: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessages: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    startWithAdmin: { type: Boolean, default: false },
    checkEnd: { type: Boolean, default: false },
  
  },
  { timestamps: true }
);

const converstion = mongoose.model("converstion", converstionSchema);
module.exports = converstion;
