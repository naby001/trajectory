const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/inviteController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Invite a user to a team
router.post("/invite", authMiddleware, inviteController.inviteUser);

// ✅ Fetch received invitations for the logged-in user
router.get("/invites", authMiddleware, inviteController.getInvites);

// ✅ Accept an invitation
router.post("/accept-invite", authMiddleware, inviteController.acceptInvite);

// ✅ Decline an invitation
router.post("/decline-invite", authMiddleware, inviteController.declineInvite);

module.exports = router;
