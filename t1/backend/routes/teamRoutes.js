const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const authMiddleware = require("../middleware/authMiddleware");
const crypto = require("crypto");

// Create a new team
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const leader = req.user.id;

    // Check if team name exists
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(400).json({ message: "Team name already exists" });
    }

    // Create new team
    const team = new Team({ name, leader, members: [leader] });
    await team.save();

    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Invite a member
router.post("/invite", authMiddleware, async (req, res) => {
  try {
    const { teamId, email } = req.body;
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Ensure only the leader can invite
    if (team.leader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the leader can invite members" });
    }

    // Generate invitation token
    const inviteToken = crypto.randomBytes(20).toString("hex");

    // Store invitation
    team.invitations.push({ email, token: inviteToken });
    await team.save();

    // Send email invitation
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
    });

    const inviteLink = `${process.env.FRONTEND_URL}/join-team/${inviteToken}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Team Invitation",
      text: `You have been invited to join the team "${team.name}". Click the link to accept: ${inviteLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Invitation sent successfully", inviteLink });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Accept Invitation
router.post("/accept-invite/:token", authMiddleware, async (req, res) => {
  try {
    const { token } = req.params;
    const userId = req.user.id;

    // Find team with the matching invitation token
    const team = await Team.findOne({ "invitations.token": token });

    if (!team) {
      return res.status(404).json({ message: "Invalid or expired invitation link" });
    }

    // Add user to the team
    team.members.push(userId);
    team.invitations = team.invitations.filter((inv) => inv.token !== token);
    await team.save();

    res.json({ message: "Successfully joined the team!", team });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Fetch all teams
router.get("/all", async (req, res) => {
  try {
    const teams = await Team.find().populate("leader members");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
