const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  // Invitation system with tokens
  invitations: [
    {
      email: { type: String, required: true },
      token: { type: String, required: true },
      status: { type: String, default: "pending" }, // pending, accepted, declined
      expiresAt: { type: Date, default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 }, // 7 days expiration
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
