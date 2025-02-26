import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; // Import Navbar component

const TeamRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [teamName, setTeamName] = useState(""); // ✅ Ensures empty string as default
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [member1, setMember1] = useState(""); // New state for team member 1
  const [member2, setMember2] = useState(""); // New state for team member 2
  const [member3, setMember3] = useState(""); // New state for team member 3
  const [phone, setPhone] = useState(""); // New state for team lead's phone number
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

        const response = await axios.get(
          "http://localhost:5000/api/team/my-teams",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.length > 0) {
          setTeamName(response.data[0].name || ""); // ✅ Default empty if missing
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
        { name: teamName, members: [member1, member2, member3], phone }, // Include team members and phone number
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
    <div
      style={{
        backgroundColor: "#1C1B1F",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Navbar /> {/* Add Navbar component */}
      <Container maxWidth="sm">
        <Paper
          elevation={10} // Increase elevation
          style={{
            padding: "20px",
            marginTop: "100px",
            backgroundColor: "#1C1B1F",
            color: "white",
            boxShadow: "0 0 10px #F45558", // Red glow effect
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Team Registration
          </Typography>

          {/* ✅ Snackbar for Notifications */}
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
          >
            <Alert
              severity={error.includes("successfully") ? "success" : "error"}
            >
              {error}
            </Alert>
          </Snackbar>

          {/* ✅ User Details - Always Locked */}
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            disabled
            InputProps={{ style: { color: "#FFFFFF", backgroundColor: "#FFFFFF" } }} // White background
          />
          <TextField
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            disabled
            InputProps={{ style: { color: "#FFFFFF", backgroundColor: "#FFFFFF" } }} // White background
          />
          <TextField
            label="Institution"
            fullWidth
            variant="outlined"
            margin="normal"
            value={institution}
            disabled
            InputProps={{ style: { color: "#FFFFFF", backgroundColor: "#FFFFFF" } }} // White background
             style={{ color: "#FFFFFF" }} // Make text white
          />

          {/* ✅ Team Name - Editable only before registration */}
          <TextField
            label="Team Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={teamName || ""} // ✅ Prevent undefined
            onChange={(e) => setTeamName(e.target.value)}
            disabled={isRegistered}
            InputProps={{ style: { color: "#FFFFFF", backgroundColor: "#FFFFFF" } }} // White background
            style={{ color: "#FFFFFF" }} // Make text white
          />

          {/* ✅ Team Members */}
          <TextField
            label="Team Member 1"
            fullWidth
            variant="outlined"
            margin="normal"
            value={member1}
            onChange={(e) => setMember1(e.target.value)}
            InputProps={{ style: { color: "#FFFFFF", backgroundColor: "#FFFFFF" } }} // White background
          />
          <TextField
            label="Team Member 2"
            fullWidth
            variant="outlined"
            margin="normal"
            value={member2}
            onChange={(e) => setMember2(e.target.value)}
            InputProps={{ style: { color: "#FFFFFF", backgroundColor: "#FFFFFF" } }} // White background
          />
          <TextField
            label="Team Member 3"
            fullWidth
            variant="outlined"
            margin="normal"
            value={member3}
            onChange={(e) => setMember3(e.target.value)}
            InputProps={{ style: { color: "#FFFFFF", backgroundColor: "#FFFFFF" } }} // White background
          />

          {/* ✅ Team Lead Phone Number */}
          <TextField
            label="Team Lead Phone Number"
            fullWidth
            variant="outlined"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{ style: { color: "#FFFFFF", backgroundColor: "#FFFFFF" } }} // White background
          />

          {/* ✅ Register or Manage Team */}
          {!isRegistered ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegister}
              disabled={loading}
              style={{
                marginTop: "20px",
                backgroundColor: "#F45558",
                color: "#FFFFFF",
              }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => navigate("/invites")}
              style={{
                marginTop: "20px",
                backgroundColor: "#F45558",
                color: "#FFFFFF",
              }}
            >
              Manage Your Team
            </Button>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default TeamRegistration;
