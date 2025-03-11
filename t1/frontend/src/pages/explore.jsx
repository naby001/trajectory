import React, { useState, useEffect, useRef } from "react";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { keyframes } from "@emotion/react";
import {
  AppBar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { MapPin, Calendar, Users } from "lucide-react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import cricketImage from "../assets/crick.webp";
import "@fontsource/roboto";
import "@fontsource/lobster";
import "@fontsource/open-sans";
import { Link } from "react-scroll";
import Squares from '../components/Square';

import hydro from "../assets/thumb/h.jpg";
import lens from "../assets/thumb/Beyondlens.webp";
import clash from "../assets/thumb/clash of cases.webp";
import data from "../assets/thumb/Data mine.jpg";
import egg from "../assets/thumb/Egg.webp";
import Hover from "../assets/thumb/Hoverpod.webp";
import mazecraft from "../assets/thumb/mazecraft.webp";
import model from "../assets/thumb/Model matrix.webp";
import robo from "../assets/thumb/robo league_.webp";
import tarka from "../assets/thumb/torko.webp";
import treasure from "../assets/thumb/Treasure hunt_.webp";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, Arial",
    h1: {
      fontFamily: "Lobster, Arial",
    },
    h4: {
      fontFamily: "Lobster, Arial",
    },
  },
  palette: {
    primary: {
      main: "#1C1B1F",
    },
    secondary: {
      main: "#F45558",
    },
  },
});

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const focusIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0.7;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  }
`;

const events = [
  {
    _id: "67b7102b9a01ff3f0a3c85e1",
    title: "HydroBlasters",
    description:
      "Get ready for an exciting water-based adventure event featuring water jets and aerodynamics.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "2-3",
    price: 2000.0,
    image:
      hydro,
  },
  {
    _id: "67b710919a01ff3f0a3c85e2",
    title: "Robo League",
    description: "Buckle up to build and program robots to play soccer autonomously or via remote control",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "3-4",
    price: 10000.0,
    image:
      robo,},
  {
    _id: "67b710b69a01ff3f0a3c85e3",
    title: "Robotrail",
    description:
      "Design and construct a line-following robot that navigates a predefined path.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "3-4",
    price: 10000.0,
    image:mazecraft,
  },
  {
    _id: "67b7141b9a01ff3f0a3c85e4",
    title: "Prot-Egg-t",
    description:
      "A fun event where participants design protective contraptions to prevent an egg from breaking during a high drop",
    location: "Mechanical Dept, Jadavpur University",
    type: "Fun Activities",
    groupSize: "2-4",
    price: 2000.0,
    image:
      egg,},
  {
    _id: "67b714349a01ff3f0a3c85e5",
    title: "Hoverpod",
    description: "",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "5",
    price: 10000.0,
    image:
      Hover,},
  {
    _id: "67b714449a01ff3f0a3c85e6",
    title: "Model Matrix",
    description:
      "Design innovative mechanical components using Solidworks or Fusion software.",
    location: "Mechanical Dept, Jadavpur University",
    type: "3D Design Battle",
    groupSize: "1",
    price: 2000.0,
    image:
      model,  },
  {
    _id: "67b714529a01ff3f0a3c85e7",
    title: "Gyaan Yudh",
    description: "Test your knowledge in a challenging quiz competition.",
    location: "Mechanical Dept, Jadavpur University",
    type: "General",
    groupSize: "1-3",
    price: 2000.0,
    image:
      "https://viralsolutions.net/wp-content/uploads/2019/06/shutterstock_749036344.webp", },
  {
    _id: "67b7145e9a01ff3f0a3c85e8",
    title: "Tarka Bitarka",
    description:
      "Engage in a lively debate on important topics with fellow participants.",
    location: "Mechanical Dept, Jadavpur University",
    type: "General",
    groupSize: "1-4",
    price: 2000.0,
    image:
      tarka,},
  {
    _id: "67b7146e9a01ff3f0a3c85e9",
    title: "Beyond The Frame",
    description: "Grasp the oppurtunity to capture the world from a unique perspective.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Fun Activities",
    groupSize: "1",
    price: 2000.0,
    image:
      lens,},
  {
    _id: "67b714799a01ff3f0a3c85ea",
    title: "Clash of Cases",
    description:
      "Use your skills to analyze real-world business scenarios and present innovative solutions to showcase your problem-solving and analytical thinking abilities.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Case Study",
    groupSize: "3-4",
    price: 2000.0,
    image:
      clash,},
  {
    _id: "67b7148d9a01ff3f0a3c85ec",
    title: "Data Mine",
    description:
      " It tests logical thinking, cryptography knowledge, and problem-solving speed.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Case Study",
    groupSize: "2-4",
    price: 2000.0,
    image: data,
  },
  
  {
    _id: "67b714b79a01ff3f0a3c85ee",
    title: "Treasure Hunt",
    description:
      "Embark on a treasure hunt across the campus, solving clues and finding hidden treasures.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Fun Activities",
    groupSize: "2-4",
    price: 2000.0,
    image:
treasure,  },
  {
    _id: "67b714d09a01ff3f0a3c85ef",
    title: "Mystery Event",
    description: "",
    location: "Mechanical Dept, Jadavpur University",
    type: "Mystery Event?",
    groupSize: "1000",
    price: 2000.0,
    image:
      "https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export function Explore() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialFilterType = queryParams.get("filter") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(initialFilterType);
  const cardRefs = useRef([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "https://trajectory-37k0.onrender.com/api/events/registered",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setRegisteredEvents(data.map((event) => event._id)); // ✅ Store event IDs
      } catch (error) {
        console.error("❌ Error fetching registered events:", error);
      }
    };

    fetchRegisteredEvents();
  }, []);

  const handleRegisterClick = async (event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    console.log("📌 Debug: Event Data:", event); // ✅ Log full event data
    console.log("📌 Debug: Event ID being sent:", event._id || "undefined"); // ✅ Log the ID being sent

    if (!event._id) {
      console.error("❌ Error: Event ID is missing!");
      return; // Stop execution if ID is missing
    }

    try {
      const response = await fetch(
        "https://trajectory-37k0.onrender.com/api/events/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ eventId: event._id }),
        }
      );

      if (!response.ok) {
        throw new Error(`❌ Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setRegisteredEvents([...registeredEvents, event._id]); // ✅ Update UI
    } catch (error) {
      console.error("❌ Registration failed:", error);
    }
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || event.type.includes(filterType))
    );
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [filteredEvents]);

  useEffect(() => {
    setFilterType(initialFilterType);
  }, [initialFilterType]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" sx={{ background: "#1C1B1F", zIndex: 1000 }}>
        <Navbar />
      </AppBar>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');`}
        {`@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');`}
        {`.exo-2-regular { font-family: "Exo 2", serif; font-optical-sizing: auto; font-weight: 400; font-style: normal; }`}
        {`.exo-2-bold { font-family: "Exo 2", serif; font-optical-sizing: auto; font-weight: 700; font-style: normal; }`}
        {`.michroma { font-family: "Michroma", sans-serif; }`}
      </style>
      <Box
        sx={{
          position: "relative",
          px: 4,
          py: 8,
          paddingTop: "8%",
          pt: { xs: 10, md: 14 },
          pb: { xs: 2, md: 10 },
          background: 'linear-gradient(90deg, #1C1B1F 0%, rgb(81, 44, 44) 50%, #1C1B1F 100%)',
          zIndex: 1, // Added z-index
          border: "2px solid black", // Added black border
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
          <Squares 
            speed={0.5} 
            squareSize={40}
            direction='diagonal' // up, down, left, right, diagonal
            borderColor='#fff'
            hoverFillColor='#222'
          />
        </div>
        <Box sx={{ zIndex: 10, position: "relative" }}>
          <Typography variant="h2" component="h1" className="michroma" sx={{ color: '#FFD700', mb: 4, textShadow: '10px 10px 4px black, 0 0 10px black', pt: 3, fontWeight: 'bold' }}>
            Explore Challenges
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              mb: 8,
              animation: `${slideIn} 0.5s ease-in-out`,
            }}
          >
            <TextField
              label="Search Events..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                width: { xs: "100%", md: "50%" }, 
               
            "& .MuiOutlinedInput-root": {
                borderRadius: "8px", // Ensure the input itself has rounded corners
                backgroundColor: "#fff",
               } }}
            />
            <FormControl
              variant="outlined"
              sx={{ width: { xs: "100%", md: "25%" }, backgroundColor: "#fff",   borderRadius: "8px",  }}
            >
              <InputLabel>Filter by Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Filter by Type"
              >
                <MenuItem value="">All events</MenuItem>
                <MenuItem value="Hardware Challenge">Hardware Challenge</MenuItem>
                <MenuItem value="3D Design Battle">
                  3D Design Battle
                </MenuItem>
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Case Study">Case Study</MenuItem>
                <MenuItem value="Fun Activities">Fun Activities</MenuItem>
                <MenuItem value="Mystery Event?">Mystery Event?</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={4} > {/* Increased padding */}
            {filteredEvents.map((event, index) => (
              <Grid item xs={12} md={6} key={event._id}> {/* 2 cards per row */}
                <Card
                  id={`event-${event._id}`}
                  ref={(el) => (cardRefs.current[index] = el)}
                  sx={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    backgroundColor: "#1C1B1F",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    height: "100%", // Increase card height
                    minHeight: "400px", // Set a minimum height
                    display: "flex",
                    flexDirection: "column",
                    animation: `${glow} 2s infinite`,
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                    },
                  }}
                >
                  <CardHeader
                    title={event.title}
                    className="michroma"
                    sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "#fff" }}
                  />
                  <CardMedia
                    component="img"
                    height="300" // Increased thumbnail height
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: "cover", objectPosition: "top" }} // Display image from the top
                  />
                  <CardContent sx={{ flexGrow: 1, color: "#fff" }}>
                    <Typography className="exo-2-regular">{event.description}</Typography>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <MapPin style={{ marginRight: "8px" }} />
                        <Typography className="exo-2-regular">{event.location}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Calendar style={{ marginRight: "8px" }} />
                        <Typography className="exo-2-regular">{event.type}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Users style={{ marginRight: "8px" }} />
                        <Typography className="exo-2-regular">{event.groupSize} people</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                    <Typography variant="h6" className="exo-2-bold" sx={{ color: "#fff" }}>
                       Prize Pool :  &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;₹ {event.price}
                    </Typography>
                    
                    <Button
                      variant="outlined"
                      sx={{ color: "#F45558", borderColor: "#F45558" }} // Updated red color
                      onClick={() => navigate(`/details?event=${event._id}`)} // Use _id instead of id
                    >
                      Event Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
