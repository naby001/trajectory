const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  // Invitations stored using user IDs instead of emails
  invitations: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, default: "pending" }, // pending, accepted, declined
      invitedAt: { type: Date, default: Date.now }, // Track invitation date
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
