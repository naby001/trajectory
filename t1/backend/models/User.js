const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  university: { type: String },
  department: { type: String },
  universityYear: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  resetPasswordCode: { type: String },
  registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  
  // ✅ Add invites array for team invitations
  invites: [{
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    teamName: { type: String },
    invitedAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('User', UserSchema);
