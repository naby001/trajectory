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
import Squares from "../components/Square"; // Import Squares component

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
  const [event, setEvent] = useState(""); // New state for event
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
        { 
          name: teamName, 
          member1, 
          member2, 
          member3, 
          phone, 
          event,
          email, 
          fullName: name, 
          institution 
        }, // Include all data
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
        position: "relative",
        backgroundColor: "#1C1B1F",
        minHeight: "100vh",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <Navbar /> {/* Add Navbar component */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor='#fff'
          hoverFillColor='#222'
        />
      </div>
      <Container maxWidth="sm" style={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={10} // Increase elevation
          style={{
            padding: "20px",
            paddingBottom: "40px", // Add padding to the bottom
            marginTop: "100px",
            backgroundColor: "rgba(28, 27, 31, 0.8)", // Transparent background
            color: "white",
            boxShadow: "0 0 10px #F45558", // Red glow effect
            backdropFilter: "blur(10px)", // Blur effect
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
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }} // Black text color
          />
          <TextField
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            disabled
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }} // Black text color
          />
          <TextField
            label="Institution"
            fullWidth
            variant="outlined"
            margin="normal"
            value={institution}
            disabled
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }} // Black text color
             style={{ color: "#000000" }} // Black text color
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
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }} // Black text color
            style={{ color: "#000000" }} // Black text color
          />

          {/* ✅ Team Members */}
          <TextField
            label="Team Member 1"
            fullWidth
            variant="outlined"
            margin="normal"
            value={member1}
            onChange={(e) => setMember1(e.target.value)}
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }} // Black text color
          />
          <TextField
            label="Team Member 2"
            fullWidth
            variant="outlined"
            margin="normal"
            value={member2}
            onChange={(e) => setMember2(e.target.value)}
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }} // Black text color
          />
          <TextField
            label="Team Member 3"
            fullWidth
            variant="outlined"
            margin="normal"
            value={member3}
            onChange={(e) => setMember3(e.target.value)}
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }} // Black text color
          />

          {/* ✅ Team Lead Phone Number */}
          <TextField
            label="Team Lead Phone Number"
            fullWidth
            variant="outlined"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }} // Black text color
          />

          {/* ✅ Event */}
          <TextField
            label="Event"
            fullWidth
            variant="outlined"
            margin="normal"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }} // Black text color
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
          ) : null} {/* Remove the "Manage Your Team" button */}
        </Paper>
      </Container>
    </div>
  );
};

export default TeamRegistration;
