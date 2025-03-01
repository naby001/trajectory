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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  const [totalemails,settotalemails]=useState([]);//contains all registered emails in trajectory
  const [registeredemails,setregisteredemails]=useState([]);//contains all regsitered emails for this particular event
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  // ✅ Load user & team data from localStorage or API
  useEffect(() => {
    
  
    if (user) {
      setEmail(user.email || ""); // ✅ Default empty if missing
      setName(user.name || "");
      setInstitution(user.university || "");
    }

    // const fetchTeamData = async () => {
    //   try {
    //     const token = localStorage.getItem("token");
    //     if (!token) return;

    //     const response = await axios.get(
    //       "https://trajectory-37k0.onrender.com/api/team/my-teams",
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     );

    //     if (response.data.length > 0) {
    //       setTeamName(response.data[0].name || ""); // ✅ Default empty if missing
    //       //setIsRegistered(true);
    //     }
    //   } catch (err) {
    //     console.error("❌ Error fetching team data:", err);
    //   }
    // };

    const fetchallusers=async()=>{
      try {
        const response=await fetch("https://trajectory-37k0.onrender.com/api/auth/getallusers",{
          method:"POST"
        });
        const returnedemails=await response.json();
        console.log(returnedemails);
        settotalemails(returnedemails);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchallregisteredemails=async()=>{
      const data={eventId:searchParams.get("event")};
      try {
        const response=await fetch("https://trajectory-37k0.onrender.com/api/team/getteamsofevent",{
          headers:{"Content-Type":"application/json"},
          method:'POST',
          body:JSON.stringify(data)
        });
        const returnedemails=await response.json();
       // console.log(returnedemails)
        setregisteredemails(returnedemails.registeredPeople);
      } catch (error) {
        
      }
    }
    fetchallusers();
    fetchallregisteredemails();
    //fetchTeamData();
  }, []);

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const eventId = queryParams.get("event");
  // setEvent(eventId);

  const [searchParams]=useSearchParams();
 
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
        "https://trajectory-37k0.onrender.com/api/team/create",
        { 
          name: teamName, 
          member1, 
          member2, 
          member3, 
          phone, 
          event:searchParams.get("event"),
          email, 
          fullName: name, 
          institution 
        }, // Include all data
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsRegistered(true);
      setError("✅ Team Registered Successfully!");
      setOpen(true);
    } catch (error) {
      setError( "❌ Error registering team");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const [isValidMember1, setIsValidMember1] = useState(null);
const [isValidMember2, setIsValidMember2] = useState(null);
const [isValidMember3, setIsValidMember3] = useState(null);

let timeout1, timeout2, timeout3;

const checkEmail = (email, setValidMember, otherEmails) => {
  clearTimeout(timeout1);
  clearTimeout(timeout2);
  clearTimeout(timeout3);

  return new Promise((resolve) => {
    setTimeout(() => {
      const isRegistered = totalemails.includes(email);
      const isUnique = !otherEmails.includes(email);
      const isNotCurrentUser = email !== user.email; // Ensure it's not the logged-in user's email
      const isEventRegistered=registeredemails.includes(email);
      const isValid = isRegistered && isUnique && isNotCurrentUser && !isEventRegistered;
      setValidMember(isValid);
      resolve(isValid);
    }, 1000);
  });
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
            label="Team Member 1 Registered email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={member1}
            onChange={(e) => {
              const email = e.target.value;
              setMember1(email);
              timeout1 = setTimeout(() => checkEmail(email, setIsValidMember1, [member2, member3]), 1000);
            }}
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }}
            error={isValidMember1 === false}
            helperText={
              isValidMember1 === false
                ? !totalemails.includes(member1)
                  ? "Email not registered"
                  : member1 === user.email
                  ? "You cannot add yourself"
                  : registeredemails.includes(member1)?
                "User already registered for this event"
                : "Email must be unique":""
            }
          />
          <TextField
            label="Team Member 2 Registered email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={member2}
            onChange={(e) => {
              const email = e.target.value;
              setMember2(email);
              timeout2 = setTimeout(() => checkEmail(email, setIsValidMember2, [member1, member3]), 1000);
            }}
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }}
            error={isValidMember2 === false}
            helperText={
              isValidMember2 === false
                ? !totalemails.includes(member2)
                  ? "Email not registered"
                  : member2 === user.email
                  ? "You cannot add yourself"
                  : registeredemails.includes(member2)?
                "User already registered for this event"
                : "Email must be unique":""
            }
          />
          <TextField
            label="Team Member 3 Registered email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={member3}
            onChange={(e) => {
              const email = e.target.value;
              setMember3(email);
              timeout3 = setTimeout(() => checkEmail(email, setIsValidMember3, [member1, member2]), 1000);
            }}
            InputProps={{ style: { color: "#000000", backgroundColor: "#FFFFFF" } }}
            error={isValidMember3 === false}
            helperText={
              isValidMember3 === false
                ? !totalemails.includes(member3)
                  ? "Email not registered"
                  : member3 === user.email
                  ? "You cannot add yourself"
                  : registeredemails.includes(member3)?
                  "User already registered for this event"
                  : "Email must be unique":""
            }
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
            disabled
            fullWidth
            variant="outlined"
            margin="normal"
            value={searchParams.get('name')}
            //onChange={(e) => setEvent(e.target.value)}
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
