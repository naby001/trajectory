import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";

const Invites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://trajectory-37k0.onrender.com/api/team/invites", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvites(response.data);
    } catch (error) {
      console.error("Error fetching invites:", error);
      setMessage("Failed to load invites.");
      setMessageType("error");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (teamId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://trajectory-37k0.onrender.com/api/team/accept-invite",
        { teamId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Successfully joined the team!");
      setMessageType("success");
      setInvites(invites.filter((invite) => invite.teamId !== teamId)); // Remove invite from UI
    } catch (error) {
      setMessage("Failed to accept invite.");
      setMessageType("error");
    } finally {
      setOpen(true);
    }
  };

  const handleDecline = async (teamId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://trajectory-37k0.onrender.com/api/team/decline-invite",
        { teamId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Invite declined.");
      setMessageType("success");
      setInvites(invites.filter((invite) => invite.teamId !== teamId)); // Remove invite from UI
    } catch (error) {
      setMessage("Failed to decline invite.");
      setMessageType("error");
    } finally {
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Team Invitations
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : invites.length === 0 ? (
          <Typography align="center">No pending invitations.</Typography>
        ) : (
          <List>
            {invites.map((invite) => (
              <ListItem key={invite.teamId} divider>
                <ListItemText primary={invite.teamName} secondary="You have been invited to join this team." />
                <ListItemSecondaryAction>
                  <Button variant="contained" color="primary" onClick={() => handleAccept(invite.teamId)}>
                    Accept
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDecline(invite.teamId)} style={{ marginLeft: "10px" }}>
                    Decline
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        {/* Snackbar Notifications */}
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
          <Alert severity={messageType}>{message}</Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Invites;
