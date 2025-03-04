const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  member1: {  type: String, }, // Store member 1 name
  member2: {  type: String, }, // Store member 2 name
  member3: {  type: String,}, // Store member 3 name
  invitations: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, default: "pending" },
      invitedAt: { type: Date, default: Date.now },
    },
  ],
  phone: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  institution: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

//the above indexes make sure to prevent duplicate registrations

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;

