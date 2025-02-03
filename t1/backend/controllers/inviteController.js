const User = require("../models/User");
const Team = require("../models/Team");

// ✅ Invite a user to a team (Stores in both `teams` & `users`)
exports.inviteUser = async (req, res) => {
  try {
    const { teamId, userId } = req.body;
    const team = await Team.findById(teamId);
    const invitedUser = await User.findById(userId);

    if (!team || !invitedUser) {
      return res.status(404).json({ message: "Team or user not found" });
    }

    // Ensure only the leader can invite members
    if (team.leader.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the team leader can invite members" });
    }

    // Check if user is already in the team
    if (team.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a team member" });
    }

    // Check if invite already exists in the team
    const existingTeamInvite = team.invitations.find((inv) => inv.userId.toString() === userId);
    if (existingTeamInvite) {
      return res.status(400).json({ message: "User has already been invited to this team" });
    }

    // Check if invite already exists in the user
    const existingUserInvite = invitedUser.invites.find((inv) => inv.teamId.toString() === teamId);
    if (existingUserInvite) {
      return res.status(400).json({ message: "User has already received this invitation" });
    }

    // ✅ Add invitation to the team
    team.invitations.push({ userId, status: "pending" });
    await team.save();

    // ✅ Add invite to user
    invitedUser.invites.push({ teamId, teamName: team.name });
    await invitedUser.save();

    res.json({ message: "Invitation sent successfully", team });
  } catch (error) {
    console.error("Error inviting user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Fetch received invitations for the logged-in user
exports.getInvites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("invites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.invites);
  } catch (error) {
    console.error("Error fetching invites:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Accept an invitation (Moves user from `invitations` to `members`)
exports.acceptInvite = async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.user.id;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Check if user is already a member
    if (team.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a member of this team" });
    }

    // ✅ Add user to team members & remove from invitations
    team.members.push(userId);
    team.invitations = team.invitations.filter((inv) => inv.userId.toString() !== userId);
    await team.save();

    // ✅ Remove invite from user's invite list
    await User.findByIdAndUpdate(userId, {
      $pull: { invites: { teamId } },
    });

    res.json({ message: "Successfully joined the team!", team });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Decline an invitation (Removes from user's invite list)
exports.declineInvite = async (req, res) => {
  try {
    const { teamId } = req.body;
    const userId = req.user.id;

    // ✅ Remove invite from user's list
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { invites: { teamId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Remove invite from team's `invitations` array
    await Team.findByIdAndUpdate(teamId, {
      $pull: { invitations: { userId } },
    });

    res.json({ message: "Invitation declined successfully" });
  } catch (error) {
    console.error("Error declining invitation:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
