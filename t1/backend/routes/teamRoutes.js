const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create a new team
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const leader = req.user.id;

    // Check if team name already exists
    if (await Team.findOne({ name })) {
      return res.status(400).json({ message: "Team name already exists" });
    }

    // Create a new team
    const team = new Team({ name, leader, members: [leader] });
    await team.save();

    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Invite a user by user ID (Instead of email)
router.post("/invite", authMiddleware, async (req, res) => {
  try {
    const { teamId, userId } = req.body;
    const team = await Team.findById(teamId);
    const invitedUser = await User.findById(userId);

    if (!team || !invitedUser) {
      return res.status(404).json({ message: "Team or user not found" });
    }

    // Ensure only the leader can invite members
    if (String(team.leader) !== req.user.id) {
      return res.status(403).json({ message: "Only the team leader can invite members" });
    }

    // Check if user is already in the team
    if (team.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a team member" });
    }

    // Check if invite already exists
    const existingInvite = invitedUser.invites.find(inv => String(inv.teamId) === teamId);
    if (existingInvite) {
      return res.status(400).json({ message: "User has already been invited to this team" });
    }

    // Add invite to user
    invitedUser.invites.push({ teamId, teamName: team.name });
    await invitedUser.save();

    res.json({ message: "Invitation sent successfully" });
  } catch (error) {
    console.error("Error inviting user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Fetch received invitations for the logged-in user
router.get("/invites", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "invites");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.invites);
  } catch (error) {
    console.error("Error fetching invites:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Accept an invitation
router.post("/accept-invite", authMiddleware, async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.user.id;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    // Check if user is already a member
    if (team.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a member of this team" });
    }

    // Add user to team & remove invite
    team.members.push(userId);
    await team.save();

    await User.findByIdAndUpdate(userId, {
      $pull: { invites: { teamId } },
    });

    res.json({ message: "Successfully joined the team!", team });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Decline an invitation
router.post("/decline-invite", authMiddleware, async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.user.id;

    // Remove invite from user's list
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { invites: { teamId } },
    }, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Invitation declined successfully" });
  } catch (error) {
    console.error("Error declining invitation:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Fetch teams of a specific user
router.get("/my-teams", authMiddleware, async (req, res) => {
  try {
    const teams = await Team.find({ members: req.user.id }).populate("leader members");
    res.json(teams);
  } catch (error) {
    console.error("Error fetching user teams:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
