const mongoose = require("mongoose");
const Event = require("../models/Event");
const User = require("../models/User");

exports.registerEvent = async (req, res) => {
  const { eventId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ msg: "Invalid Event ID" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.registeredEvents.includes(eventId)) {
      return res.status(400).json({ msg: "Already registered for this event" });
    }

    user.registeredEvents.push(eventId);
    event.participants.push(req.user.id);

    await user.save();
    await event.save();

    res.json({ msg: "Registered successfully", registeredEvents: user.registeredEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
