import React, { useState } from "react";
import { Container, TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const InviteTeamMembers = ({ teamId }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // 'success' or 'error'
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email.trim()) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/team/invite",
        { teamId, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data.message || "Error sending invitation");
      setMessageType("error");
    } finally {
      setOpen(true);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <TextField
        label="Invite by Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleInvite} 
        disabled={loading} 
        style={{ marginTop: "10px" }}
      >
        {loading ? "Sending..." : "Send Invite"}
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity={messageType}>{message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default InviteTeamMembers;
