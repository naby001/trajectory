const Event = require('../models/Event');

exports.registerEvent = async (req, res) => {
  const { eventId } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    event.participants.push(req.user.id);
    await event.save();
    res.json({ msg: 'Registered successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getRegisteredEvents = async (req, res) => {
  try {
    const events = await Event.find({ participants: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
