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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TeamRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamChoice, setTeamChoice] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");

  const navigate = useNavigate();

  // Load user & team data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const storedTeam = JSON.parse(localStorage.getItem("team"));

    if (user) {
      setEmail(user.email);
      setName(user.name);
      setInstitution(user.university);
    }

    if (storedTeam) {
      setTeamName(storedTeam.teamName);
      setTeamChoice(storedTeam.teamChoice);
      setIsRegistered(true);
    }
  }, []);

  const handleRegister = () => {
    if (teamName.trim() === "" || teamChoice === "") {
      alert("Please enter a team name and select an option.");
      return;
    }

    const teamData = { teamName, teamChoice };
    localStorage.setItem("team", JSON.stringify(teamData));
    setIsRegistered(true);
    alert("Team Registered Successfully!");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Team Registration
        </Typography>

        {/* User Details - Always Locked */}
        <TextField label="Email" fullWidth variant="outlined" margin="normal" value={email} disabled />
        <TextField label="Full Name" fullWidth variant="outlined" margin="normal" value={name} disabled />
        <TextField label="Institution" fullWidth variant="outlined" margin="normal" value={institution} disabled />

        {/* Team Name - Editable only after clicking Register */}
        <TextField
          label="Team Name"
          fullWidth
          variant="outlined"
          margin="normal"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          disabled={isRegistered}
        />

        {/* Create or Join a Team - Unlocks after Register */}
        <Typography variant="subtitle1" gutterBottom>
          Select your option:
        </Typography>
        <RadioGroup
          row
          value={teamChoice}
          onChange={(e) => setTeamChoice(e.target.value)}
          disabled={isRegistered}
        >
          <FormControlLabel value="create" control={<Radio />} label="Create a Team" disabled={isRegistered} />
          <FormControlLabel value="join" control={<Radio />} label="Join a Team" disabled={isRegistered} />
        </RadioGroup>

        {/* Register or Edit Team */}
        {!isRegistered ? (
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister} style={{ marginTop: "20px" }}>
            Register
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate("/InviteTeamMembers")}
            style={{ marginTop: "20px" }}
          >
            Edit Your Team
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default TeamRegistration;
