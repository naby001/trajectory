import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeamRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [teamName, setTeamName] = useState("");  // ✅ Ensures empty string as default
  const [teamChoice, setTeamChoice] = useState("create"); // ✅ Default choice
  const [email, setEmail] = useState(""); 
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // Snackbar state
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  // ✅ Load user & team data from localStorage or API
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setEmail(user.email || ""); // ✅ Default empty if missing
      setName(user.name || "");
      setInstitution(user.university || "");
    }

    const fetchTeamData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/team/my-teams", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.length > 0) {
          setTeamName(response.data[0].name || ""); // ✅ Default empty if missing
          setTeamChoice("create");
          setIsRegistered(true);
        }
      } catch (err) {
        console.error("❌ Error fetching team data:", err);
      }
    };

    fetchTeamData();
  }, []);

  // ✅ Handle Team Registration
  const handleRegister = async () => {
    if (!teamName.trim()) {
      setError("⚠️ Please enter a valid team name.");
      setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ User not authenticated. Please log in.");
        setOpen(true);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/team/create",
        { name: teamName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem("team", JSON.stringify(response.data.team));
      setIsRegistered(true);
      setError("✅ Team Registered Successfully!");
      setOpen(true);
    } catch (error) {
      setError(error.response?.data?.message || "❌ Error registering team");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Team Registration
        </Typography>

        {/* ✅ Snackbar for Notifications */}
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
          <Alert severity={error.includes("successfully") ? "success" : "error"}>{error}</Alert>
        </Snackbar>

        {/* ✅ User Details - Always Locked */}
        <TextField label="Email" fullWidth variant="outlined" margin="normal" value={email} disabled />
        <TextField label="Full Name" fullWidth variant="outlined" margin="normal" value={name} disabled />
        <TextField label="Institution" fullWidth variant="outlined" margin="normal" value={institution} disabled />

        {/* ✅ Team Name - Editable only before registration */}
        <TextField
          label="Team Name"
          fullWidth
          variant="outlined"
          margin="normal"
          value={teamName || ""}  // ✅ Prevent undefined
          onChange={(e) => setTeamName(e.target.value)}
          disabled={isRegistered}
        />

        {/* ✅ Create or Join a Team */}
        <Typography variant="subtitle1" gutterBottom>
          Select your option:
        </Typography>
        <RadioGroup
          row
          value={teamChoice}
          onChange={(e) => setTeamChoice(e.target.value)}
        >
          <FormControlLabel value="create" control={<Radio />} label="Create a Team" disabled={isRegistered} />
          <FormControlLabel value="join" control={<Radio />} label="Join a Team" disabled={isRegistered} />
        </RadioGroup>

        {/* ✅ Register or Manage Team */}
        {!isRegistered ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            disabled={loading}
            style={{ marginTop: "20px" }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate("/invites")}
            style={{ marginTop: "20px" }}
          >
            Manage Your Team
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default TeamRegistration;
