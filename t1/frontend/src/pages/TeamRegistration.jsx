import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Chip,
  InputAdornment,
} from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; // Import Navbar component
import Squares from "../components/Square"; // Import Squares component
import { events } from "./details.jsx"; // Import events data from details.jsx
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const TeamRegistration = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const [teamName, setTeamName] = useState(""); // ✅ Ensures empty string as default
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [memberEmails, setMemberEmails] = useState([]);
  const [phone, setPhone] = useState(""); // New state for team lead's phone number
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // Snackbar state
  const [loading, setLoading] = useState(false); // Loading state
  const [totalemails, settotalemails] = useState([]); // contains all registered emails in trajectory
  const [registeredemails, setregisteredemails] = useState([]); // contains all registered emails for this particular event
  const [isphone, setisphone] = useState(true);
  const [isteamname, setisteamname] = useState(true);
  const [validationStates, setValidationStates] = useState([]);
  
  // Add state to track when email validation is in progress
  const [emailCheckingStates, setEmailCheckingStates] = useState([]);
  
  // Add state to store registered team data
  const [registeredTeamData, setRegisteredTeamData] = useState(null);
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("event");
  
  // Get min and max team size from event details
  const [minTeamSize, setMinTeamSize] = useState(1);
  const [maxTeamSize, setMaxTeamSize] = useState(1);

  // ✅ Load user & team data from localStorage or API and get event details
  useEffect(() => {
    if (user) {
      setEmail(user.email || ""); // ✅ Default empty if missing
      setName(user.name || "");
      setInstitution(user.university || "");
    }

    // Fetch event details from the imported events array
    const event = events.find(e => e.id === eventId);
    if (event) {
      setEventDetails(event);
      
      // Parse group size (could be "1", "2-3", "5", etc.)
      const groupSizeStr = event.groupSize;
      if (groupSizeStr.includes('-')) {
        const [min, max] = groupSizeStr.split('-').map(num => parseInt(num));
        setMinTeamSize(min);
        setMaxTeamSize(max);
      } else {
        const size = parseInt(groupSizeStr);
        setMinTeamSize(size);
        setMaxTeamSize(size);
      }
    }

    const fetchallusers = async () => {
      try {
        const response = await fetch("https://trajectory-37k0.onrender.com/api/auth/getallusers", {
          method: "POST"
        });
        const returnedemails = await response.json();
        console.log(returnedemails);
        settotalemails(returnedemails);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchallregisteredemails = async () => {
      const data = { eventId: eventId };
      try {
        const response = await fetch("https://trajectory-37k0.onrender.com/api/team/getteamsofevent", {
          headers: { "Content-Type": "application/json" },
          method: 'POST',
          body: JSON.stringify(data)
        });
        const returnedemails = await response.json();
        // console.log(returnedemails)
        setregisteredemails(returnedemails.registeredPeople);
      } catch (error) {
        console.error("Error fetching registered emails:", error);
      }
    }
    
    // Check if the user is already registered for this event
    const checkUserRegistration = async () => {
      if (!user || !user.email) return;
      
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const response = await axios.get(
          "https://trajectory-37k0.onrender.com/api/team/my-teams",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Find if user is part of a team for this event
        const userTeams = response.data;
        const registeredTeam = userTeams.find(team => team.event === eventId);
        
        if (registeredTeam) {
          setIsRegistered(true);
          
          // Format the team data for display
          const teamMembers = [
            registeredTeam.member1,
            registeredTeam.member2,
            registeredTeam.member3
          ].filter(member => member && member.trim() !== '');
          
          setRegisteredTeamData({
            teamName: registeredTeam.name,
            leader: { 
              name: registeredTeam.leadName || user.name, 
              email: registeredTeam.leadEmail || user.email,
              phone: registeredTeam.phone || '',
              institution: registeredTeam.institution || user.university || ''
            },
            members: teamMembers
          });
        }
      } catch (error) {
        console.error("Error checking user registration:", error);
      }
    };
    
    fetchallusers();
    fetchallregisteredemails();
    checkUserRegistration();
  }, [eventId]);

  // Initialize member emails array when max team size is determined
  useEffect(() => {
    if (maxTeamSize > 1) {
      // Leader is one member, so we need maxTeamSize - 1 additional members
      const additionalMembers = maxTeamSize - 1;
      setMemberEmails(Array(additionalMembers).fill(''));
      setValidationStates(Array(additionalMembers).fill(null));
      setEmailCheckingStates(Array(additionalMembers).fill(false));
    }
  }, [maxTeamSize]);

  // ✅ Handle Team Registration
  const handleRegister = async () => {
    if (!teamName.trim()) {
      setError("⚠️ Please enter a valid team name.");
      setisteamname(false);
      setOpen(true);
      return;
    }
    if (!phone) {
      setError("⚠️ Please enter team leader phone number.");
      setisphone(false);
      setOpen(true);
      return;
    }

    // Validate that we have at least the minimum required members
    const requiredAdditionalMembers = minTeamSize - 1; // Minus 1 because leader is already counted
    const providedMemberEmails = memberEmails.filter(email => email.trim() !== '');
    
    if (providedMemberEmails.length < requiredAdditionalMembers) {
      setError(`⚠️ This event requires at least ${minTeamSize} team members (including leader).`);
      setOpen(true);
      return;
    }

    // Validate member emails
    for (let i = 0; i < memberEmails.length; i++) {
      if (memberEmails[i].trim() !== '' && validationStates[i] === false) {
        setError("⚠️ One or more member emails are invalid.");
        setOpen(true);
        return;
      }
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ User not authenticated. Please log in.");
        setOpen(true);
        return;
      }

      // Transform member emails into the format expected by the backend
      const member1 = memberEmails[0] || '';
      const member2 = memberEmails[1] || '';
      const member3 = memberEmails[2] || '';
      
      const response = await axios.post(
        "https://trajectory-37k0.onrender.com/api/team/create",
        {
          name: teamName,
          member1,
          member2,
          member3,
          phone,
          event: eventId,
          email,
          fullName: name,
          institution
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsRegistered(true);
      // Store the registered team data
      setRegisteredTeamData({
        teamName,
        leader: { name, email, phone, institution },
        members: memberEmails.filter(email => email.trim() !== '')
      });
      setError("✅ Team Registered Successfully!");
      setOpen(true);
    } catch (error) {
      setError("❌ Error registering team");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Modified checkEmail function to handle visual feedback
  const checkEmail = (email, index, otherEmails) => {
    if (!email) {
      const newValidationStates = [...validationStates];
      newValidationStates[index] = null;
      setValidationStates(newValidationStates);
      return;
    }

    // Show checking state immediately
    const newCheckingStates = [...emailCheckingStates];
    newCheckingStates[index] = true;
    setEmailCheckingStates(newCheckingStates);

    return new Promise((resolve) => {
      // Reduced timeout for better responsiveness
      setTimeout(() => {
        const isRegistered = totalemails.includes(email);
        const isUnique = !otherEmails.includes(email);
        const isNotCurrentUser = email !== user.email; // Ensure it's not the logged-in user's email
        const isEventRegistered = registeredemails.includes(email);
        const isValid = isRegistered && isUnique && isNotCurrentUser && !isEventRegistered;
        
        const newValidationStates = [...validationStates];
        newValidationStates[index] = isValid;
        setValidationStates(newValidationStates);
        
        // Update checking state to false after validation completes
        const updatedCheckingStates = [...emailCheckingStates];
        updatedCheckingStates[index] = false;
        setEmailCheckingStates(updatedCheckingStates);
        
        resolve(isValid);
      }, 500); // Reduced from 1000ms to 500ms for faster feedback
    });
  };

  // Modified handleMemberEmailChange for immediate feedback
  const handleMemberEmailChange = (index, email) => {
    const newMemberEmails = [...memberEmails];
    newMemberEmails[index] = email;
    setMemberEmails(newMemberEmails);

    // Only check validity if email contains @ (basic validation)
    if (email.includes('@')) {
      // Filter out the email at the current index
      const otherEmails = newMemberEmails.filter((_, i) => i !== index);
      checkEmail(email, index, otherEmails);
    } else if (email === '') {
      // Clear validation state if email is empty
      const newValidationStates = [...validationStates];
      newValidationStates[index] = null;
      setValidationStates(newValidationStates);
    }
  };

  // Function to get the appropriate email status message
  const getEmailStatusMessage = (index, email) => {
    if (emailCheckingStates[index]) {
      return "Checking...";
    }
    
    if (!email || validationStates[index] === null) {
      return "";
    }
    
    if (validationStates[index] === true) {
      return "Registered";
    }
    
    if (!totalemails.includes(email)) {
      return "Not registered";
    }
    
    if (email === user.email) {
      return "Cannot add yourself";
    }
    
    if (registeredemails.includes(email)) {
      return "Already registered for this event";
    }
    
    return "Email must be unique";
  };

  // Function to get the appropriate status icon
  const getEmailStatusIcon = (index, email) => {
    if (emailCheckingStates[index]) {
      return <HourglassEmptyIcon fontSize="small" />;
    }
    
    if (validationStates[index] === true) {
      return <CheckCircleIcon fontSize="small" />;
    }
    
    if (email && validationStates[index] === false) {
      return <ErrorIcon fontSize="small" />;
    }
    
    return null;
  };

  // Function to get the color for the status indicator
  const getStatusColor = (index, email) => {
    if (emailCheckingStates[index]) {
      return "#f5a623"; // Orange for checking
    }
    
    if (validationStates[index] === true) {
      return "#4caf50"; // Green for valid
    }
    
    if (email && validationStates[index] === false) {
      return "#f44336"; // Red for invalid
    }
    
    return ""; // Default
  };

  // Show loading state if event details aren't loaded yet
  if (!eventDetails) {
    return (
      <div
        style={{
          position: "relative",
          backgroundColor: "#1C1B1F",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
          <Squares 
            speed={0.5} 
            squareSize={40}
            direction='diagonal'
            borderColor='#fff'
            hoverFillColor='#222'
          />
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", color: "white" }}>
          <CircularProgress color="inherit" />
          <Typography variant="h6" style={{ marginTop: 20 }}>
            Loading Event Details...
          </Typography>
        </div>
      </div>
    );
  }

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
            Team Registration for {eventDetails.title}
          </Typography>

          <Typography variant="subtitle1" align="center" gutterBottom>
            Team Size: {eventDetails.groupSize} members
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

          {!isRegistered ? (
            /* Registration Form - Only shown when not registered */
            <>
              {/* ✅ User Details - Always Locked */}
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                value={email}
                disabled
                InputProps={{
                  style: { backgroundColor: "#FFFFFF" }
                }}
                sx={{
                  "& .MuiInputLabel-root": { 
                    color: "#FF0000",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "0 8px",
                    borderRadius: "4px"
                  },
                  "& .MuiInputLabel-root.Mui-focused": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiInputLabel-root.Mui-disabled": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiOutlinedInput-root": { 
                    "& > fieldset": { borderColor: "#888888", borderWidth: "1px" },
                    "& .Mui-disabled": { 
                      "-webkit-text-fill-color": "#666666 !important",
                      color: "#666666 !important"
                    }
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    "-webkit-text-fill-color": "#666666",
                    color: "#666666"
                  },
                  marginBottom: "20px"
                }}
              />
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                margin="normal"
                value={name}
                disabled
                InputProps={{
                  style: { backgroundColor: "#FFFFFF" }
                }}
                sx={{
                  "& .MuiInputLabel-root": { 
                    color: "#FF0000",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "0 8px",
                    borderRadius: "4px"
                  },
                  "& .MuiInputLabel-root.Mui-focused": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiInputLabel-root.Mui-disabled": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiOutlinedInput-root": { 
                    "& > fieldset": { borderColor: "#888888", borderWidth: "1px" },
                    "& .Mui-disabled": { 
                      "-webkit-text-fill-color": "#666666 !important",
                      color: "#666666 !important"
                    }
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    "-webkit-text-fill-color": "#666666",
                    color: "#666666"
                  },
                  marginBottom: "20px"
                }}
              />
              <TextField
                label="Institution"
                fullWidth
                variant="outlined"
                margin="normal"
                value={institution}
                disabled
                InputProps={{
                  style: { backgroundColor: "#FFFFFF" }
                }}
                sx={{
                  "& .MuiInputLabel-root": { 
                    color: "#FF0000",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "0 8px",
                    borderRadius: "4px"
                  },
                  "& .MuiInputLabel-root.Mui-focused": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiInputLabel-root.Mui-disabled": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiOutlinedInput-root": { 
                    "& > fieldset": { borderColor: "#888888", borderWidth: "1px" },
                    "& .Mui-disabled": { 
                      "-webkit-text-fill-color": "#666666 !important",
                      color: "#666666 !important"
                    }
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    "-webkit-text-fill-color": "#666666",
                    color: "#666666"
                  },
                  marginBottom: "20px"
                }}
              />

              {/* ✅ Team Name - Editable only before registration */}
              <TextField
                label="Team Name*"
                fullWidth
                variant="outlined"
                margin="normal"
                value={teamName || ""}
                onChange={(e) => {setTeamName(e.target.value); setisteamname(true);}}
                error={!isteamname}
                helperText={!isteamname && "Enter a team name"}
                InputProps={{
                  style: { backgroundColor: "#FFFFFF" }
                }}
                inputProps={{
                  style: { color: "#666666" }
                }}
                sx={{
                  "& .MuiInputLabel-root": { 
                    color: "#FF0000",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "0 8px",
                    borderRadius: "4px"
                  },
                  "& .MuiInputLabel-root.Mui-focused": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiOutlinedInput-root": { 
                    "& > fieldset": { borderColor: "#888888", borderWidth: "1px" }
                  },
                  marginBottom: "20px"
                }}
              />

              {/* ✅ Team Members - Dynamically rendered based on event requirements with enhanced feedback */}
              {memberEmails.map((email, index) => (
                <TextField
                  key={index}
                  label={`Team Member ${index + 1} Registered email${index < (minTeamSize - 1) ? '*' : ''}`}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => handleMemberEmailChange(index, e.target.value)}
                  InputProps={{ 
                    style: { backgroundColor: "#FFFFFF" },
                    endAdornment: email ? (
                      <InputAdornment position="end">
                        <Chip
                          icon={getEmailStatusIcon(index, email)}
                          label={getEmailStatusMessage(index, email)}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: getStatusColor(index, email),
                            borderColor: getStatusColor(index, email),
                            display: email ? 'flex' : 'none'
                          }}
                        />
                      </InputAdornment>
                    ) : null
                  }}
                  inputProps={{
                    style: { color: "#666666" }
                  }}
                  sx={{
                    "& .MuiInputLabel-root": { 
                      color: "#FF0000",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      padding: "0 8px",
                      borderRadius: "4px"
                    },
                    "& .MuiInputLabel-root.Mui-focused": { 
                      color: "#FF0000",
                      fontWeight: "bold" 
                    },
                    "& .MuiOutlinedInput-root": { 
                      "& > fieldset": { borderColor: "#888888", borderWidth: "1px" }
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#FF0000",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      marginTop: "5px"
                    },
                    marginBottom: "20px"
                  }}
                  error={validationStates[index] === false && email !== ''}
                  helperText={
                    validationStates[index] === false && email !== ''
                      ? !totalemails.includes(email)
                        ? "Email not registered"
                        : email === user.email
                        ? "You cannot add yourself"
                        : registeredemails.includes(email)
                        ? "User already registered for this event"
                        : "Email must be unique"
                      : index < (minTeamSize - 1) && email === ''
                      ? "This member must be added for this event"
                      : ""
                  }
                  required={index < (minTeamSize - 1)}
                />
              ))}

              {/* Event information message */}
              {minTeamSize > 1 && (
                <Typography variant="body2" align="left" style={{ marginTop: "5px", marginBottom: "15px", color: "#FF0000", fontWeight: "bold" }}>
                  This event requires at least {minTeamSize} members in a team
                </Typography>
              )}

              {/* ✅ Team Lead Phone Number */}
              <TextField
                label="Team Lead Phone Number*"
                fullWidth
                variant="outlined"
                margin="normal"
                value={phone}
                onChange={(e) => {setPhone(e.target.value); setisphone(true);}}
                error={!isphone}
                InputProps={{
                  style: { backgroundColor: "#FFFFFF" }
                }}
                inputProps={{
                  style: { color: "#666666" }
                }}
                sx={{
                  "& .MuiInputLabel-root": { 
                    color: "#FF0000",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "0 8px",
                    borderRadius: "4px"
                  },
                  "& .MuiInputLabel-root.Mui-focused": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiOutlinedInput-root": { 
                    "& > fieldset": { borderColor: "#888888", borderWidth: "1px" }
                  },
                  marginBottom: "20px"
                }}
                helperText={
                  !isphone && "Team Leader Phone Number is mandatory"
                }
              />

              {/* ✅ Event */}
              <TextField
                label="Event"
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                value={eventDetails.title}
                InputProps={{
                  style: { backgroundColor: "#FFFFFF" }
                }}
                sx={{
                  "& .MuiInputLabel-root": { 
                    color: "#FF0000",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "0 8px",
                    borderRadius: "4px"
                  },
                  "& .MuiInputLabel-root.Mui-focused": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiInputLabel-root.Mui-disabled": { 
                    color: "#FF0000",
                    fontWeight: "bold" 
                  },
                  "& .MuiOutlinedInput-root": { 
                    "& > fieldset": { borderColor: "#888888", borderWidth: "1px" },
                    "& .Mui-disabled": { 
                      "-webkit-text-fill-color": "#666666 !important",
                      color: "#666666 !important"
                    }
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    "-webkit-text-fill-color": "#666666",
                    color: "#666666"
                  },
                  marginBottom: "20px"
                }}
              />

              {/* Register Button */}
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
            </>
          ) : (
            /* Team Details - Only shown when registered */
            <Box sx={{ mt: 3, p: 2, border: '1px solid #F45558', borderRadius: 2, backgroundColor: 'rgba(244, 85, 88, 0.1)' }}>
              <Typography variant="h6" align="center" sx={{ mb: 2, color: '#F45558' }}>
                Team Registration Successful
              </Typography>
              
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Team Name:</strong> {registeredTeamData?.teamName}
              </Typography>
              
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Team Leader:</strong> {registeredTeamData?.leader.name} ({registeredTeamData?.leader.email})
              </Typography>
              
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <strong>Phone:</strong> {registeredTeamData?.leader.phone}
              </Typography>
              
              {registeredTeamData?.members.length > 0 && (
                <>
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    <strong>Team Members:</strong>
                  </Typography>
                  {registeredTeamData.members.map((memberEmail, index) => (
                    <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                      • {memberEmail}
                    </Typography>
                  ))}
                </>
              )}
              
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Good luck in {eventDetails?.title}!
              </Typography>
            </Box>
          )}

          <Typography variant="body2" align="center" style={{ marginTop: "20px", color: "#FF0000", fontWeight: "bold" }}>
            <strong>Note:</strong> &nbsp;
             Only the team leader needs to register.
             All team members must have an account on this website.
          </Typography>
        </Paper>
       
      </Container>
    </div>
  );
};

export default TeamRegistration;
