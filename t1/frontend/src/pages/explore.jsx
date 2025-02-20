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
    id: 1,
    title: "HydroBlasters",
    description:
      "Showcase your CAD skills by designing innovative mechanical components.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "1-3",
    price: 1000.00,
    image:
      "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 2,
    title: "Robo League",
    description: "Build and race your robots on an obstacle-filled track.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "2-5",
    price: 6000.00,
    image:
      "https://images.pexels.com/photos/256412/pexels-photo-256412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 3,
    title: "Mazecraft",
    description:
      "Design and construct a line-following robot that navigates a predefined path.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "3-6",
    price: 6000.00,
    image:
      "https://images.pexels.com/photos/1438515/pexels-photo-1438515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 4,
    title: "Prot-Egg-t",
    description:
      "Build a hydraulic arm to complete specified tasks with precision.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "1-4",
    price: 1000.00,
    image:
      "https://images.pexels.com/photos/256660/pexels-photo-256660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 5,
    title: "Hoverpod",
    description: "Compete in an intense 5-a-side football tournament.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "5",
    price: 6000.00,
    image:
      "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 6,
    title: "Model Matrix",
    description:
      "Design innovative mechanical components using Solidworks or Fusion software.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Simulation Challenge",
    groupSize: "5",
    price: 1000.00,
    image:
      "https://images.pexels.com/photos/4425763/pexels-photo-4425763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 7,
    title: "Gyaan Yudh",
    description: "Test your knowledge in a challenging quiz competition.",
    location: "Mechanical Dept, Jadavpur University",
    type: "General",
    groupSize: "General",
    price: 1000.00,
    image:
      "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 8,
    title: "Tarka Bitarka",
    description:
      "Engage in a lively debate on important topics with fellow participants.",
    location: "Mechanical Dept, Jadavpur University",
    type: "General",
    groupSize: "5",
    price: 1000.00,
    image:
      "https://images.pexels.com/photos/9825980/pexels-photo-9825980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 9,
    title: "Beyond The Frame",
    description: "Compete in a fast-paced mixed doubles badminton tournament.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Sports Challenge",
    groupSize: "1",
    price: 1000.00,
    image:
      "https://images.pexels.com/photos/210027/pexels-photo-210027.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 10,
    title: "Clash of Cases",
    description:
      "Compete in a traditional tug of war competition with your team.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Sports Challenge",
    groupSize: "3-5",
    price: 1000.00,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMpWZh3RDT7SttEtt1yebbB2tnpHMeQ8BqqA&s",
  },
  {
    id: 11,
    title: "Data Mine",
    description:
      "Participate in a thrilling cricket match, showcasing your skills.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Sports Challenge",
    groupSize: "3",
    price: 1000.00,
    image: cricketImage,
  },
  {
    id: 12,
    title: "Football",
    description: "Participate in an exciting football match with your team.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Sports Challenge",
    groupSize: "6-10",
    price: 1000.00,
    image:
      "https://cdn.magicdecor.in/com/2024/05/22173454/Football-Abstract-Design-Wallpaper-Mural-710x488.jpg",
  },
  {
    id: 13,
    title: "Treasure Hunt",
    description:
      "Embark on a treasure hunt across the campus, solving clues and finding hidden treasures.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Fun Activities",
    groupSize: "6-10",
    price: 1000.00,
    image:
      "https://www.wanderquest.in/monthly-subscription-boxes-for-kids-6-to-12-years/modules//smartblog/images/15-single-default.jpg",
  },
  {
    id: 14,
    title: "Mystery Event",
    description: "",
    location: "Mechanical Dept, Jadavpur University",
    type: "Mystery Event?",
    groupSize: "6-10",
    price: 1000.00,
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

  const handleRegisterClick = (eventTitle) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (registeredEvents.includes(eventTitle)) {
        console.log(`You are already registered for ${eventTitle}`);
      } else {
        setRegisteredEvents([...registeredEvents, eventTitle]);
        console.log(`You have successfully registered for ${eventTitle}`);
        navigate("/details");
      }
    } else {
      navigate("/login");
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
      <AppBar position="fixed" sx={{ background: "#282a3a", zIndex: 1000 }}>
        <Navbar />
      </AppBar>

      <Box
        sx={{
          position: "relative",
          px: 4,
          py: 8,
          paddingTop: "8%",
          animation: `${fadeIn} 1s ease-in-out`,
          pt: { xs: 10, md: 14 }, pb: { xs: 2, md: 10 },
          background: "black",
        }}
        
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ color: "#fff", fontSize: { xs: "2rem", md: "4rem" } }}
        >
          Explore Events
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
            sx={{ width: { xs: "100%", md: "50%" }, backgroundColor: "#fff" }}
          />
          <FormControl
            variant="outlined"
            sx={{ width: { xs: "100%", md: "25%" }, backgroundColor: "#fff" }}
          >
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="">All events</MenuItem>
              <MenuItem value="Hardware Challenge">Hardware Challenge</MenuItem>
              <MenuItem value="Simulation Challenge">
                Simulation Challenge
              </MenuItem>
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Sports Challenge">Sports Challenge</MenuItem>
              <MenuItem value="Fun Activities">Fun Activities</MenuItem>
              <MenuItem value="Mystery Event?">Mystery Event?</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {filteredEvents.map((event, index) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card
                id={`event-${event.id}`}
                ref={(el) => (cardRefs.current[index] = el)}
                sx={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  height: "100%",
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
                  sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "#fff" }}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent sx={{ flexGrow: 1, color: "#fff" }}>
                  <Typography>{event.description}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <MapPin style={{ marginRight: "8px" }} />
                      <Typography>{event.location}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Calendar style={{ marginRight: "8px" }} />
                      <Typography>{event.type}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Users style={{ marginRight: "8px" }} />
                      <Typography>{event.groupSize} people</Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                  <Typography variant="h6" sx={{ color: "#fff" }}>₹ {event.price}</Typography>
                  <Button
                    variant="contained"
                     color={registeredEvents.includes(event.title) ? "error" : "primary"}
                    onClick={() => handleRegisterClick(event.title)}
                  >
                    {registeredEvents.includes(event.title) ? "Registered" : "Register"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
