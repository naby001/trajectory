import { useState } from "react";
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import backgroundVideo from "../assets/vid3.mp4";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { MapPin, Calendar, Users } from 'lucide-react';
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import cricketImage from "../assets/crick.webp";
import "@fontsource/roboto"; // Import Roboto font
import "@fontsource/lobster"; // Import Lobster font
import "@fontsource/open-sans"; // Import Open Sans font

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

const events = [
  {
    id: 1,
    title: "Water Rocket",
    description: "Showcase your CAD skills by designing innovative mechanical components.",
    location: "Hall A, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "1-3",
    price: 150,
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 2,
    title: "Robo Soccer",
    description: "Build and race your robots on an obstacle-filled track.",
    location: "Central Lawn, Tech Campus",
    type: "Hardware Challenge",
    groupSize: "2-5",
    price: 300,
    image: "https://images.pexels.com/photos/256412/pexels-photo-256412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 3,
    title: "Line Follower",
    description: "Design and construct a line-following robot that navigates a predefined path.",
    location: "Workshop Area, Block B",
    type: "Hardware Challenge",
    groupSize: "3-6",
    price: 200,
    image: "https://images.pexels.com/photos/1438515/pexels-photo-1438515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 4,
    title: "Egglosion",
    description: "Build a hydraulic arm to complete specified tasks with precision.",
    location: "Lab 3, Mechanical Wing",
    type: "Hardware Challenge",
    groupSize: "1-4",
    price: 250,
    image: "https://images.pexels.com/photos/256660/pexels-photo-256660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 5,
    title: "HoverPod",
    description: "Compete in an intense 5-a-side football tournament.",
    location: "Sports Ground, North Campus",
    type: "Hardware Challenge",
    groupSize: "5",
    price: 100,
    image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 6,
    title: "Solidworks/Fusion",
    description: "Design innovative mechanical components using Solidworks or Fusion software.",
    location: "Gaming Arena, Hall C",
    type: "Simulation Challenge",
    groupSize: "5",
    price: 200,
    image: "https://images.pexels.com/photos/4425763/pexels-photo-4425763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 7,
    title: "Quiz",
    description: "Test your knowledge in a challenging quiz competition.",
    location: "Open Ground, East Campus",
    type: "General",
    groupSize: "General",
    price: 500,
    image: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 8,
    title: "Debate",
    description: "Engage in a lively debate on important topics with fellow participants.",
    location: "eSports Zone, Hall B",
    type: "General",
    groupSize: "5",
    price: 200,
    image: "https://images.pexels.com/photos/9825980/pexels-photo-9825980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 9,
    title: "Badminton(Mixed)",
    description: "Compete in a fast-paced mixed doubles badminton tournament.",
    location: "Recreation Hall, Block F",
    type: "Sports Challenge",
    groupSize: "1",
    price: 50,
    image: "https://images.pexels.com/photos/210027/pexels-photo-210027.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 10,
    title: "Tug of War",
    description: "Compete in a traditional tug of war competition with your team.",
    location: "Automotive Lab, Block E",
    type: "Sports Challenge",
    groupSize: "3-5",
    price: 450,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMpWZh3RDT7SttEtt1yebbB2tnpHMeQ8BqqA&s",
  },
  {
    id: 11,
    title: "Cricket",
    description: "Participate in a thrilling cricket match, showcasing your skills.",
    location: "eSports Lounge, Main Block",
    type: "Sports Challenge",
    groupSize: "3",
    price: 150,
    image: cricketImage,
  },
  {
    id: 12,
    title: "Football",
    description: "Participate in an exciting football match with your team.",
    location: "Cricket Ground, South Campus",
    type: "Sports Challenge",
    groupSize: "6-10",
    price: 100,
    image: "https://cdn.magicdecor.in/com/2024/05/22173454/Football-Abstract-Design-Wallpaper-Mural-710x488.jpg",
  },
  {
    id: 13,
    title: "Treasure Hunt",
    description: "Embark on a treasure hunt across the campus, solving clues and finding hidden treasures.",
    location: "Campus Grounds",
    type: "Fun Activities",
    groupSize: "6-10",
    price: 100,
    image: "https://www.wanderquest.in/monthly-subscription-boxes-for-kids-6-to-12-years/modules//smartblog/images/15-single-default.jpg",
  },
  {
    id: 14,
    title: "Mystery Event",
    description: "",
    location: "JU Campus",
    type: "Mystery Event?",
    groupSize: "6-10",
    price: 100,
    image: "https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export function Explore() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialFilterType = queryParams.get("filter") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(initialFilterType);

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || event.type.includes(filterType))
    );
  });

  return (
    
    <ThemeProvider theme={theme}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ background: "#282a3a" }}>
        <Navbar />
      </AppBar>
      
      <Box
        sx={{
          position: 'relative',
          px: 4,
          py: 8,
          paddingTop: "8%",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <br>
        </br>
        <Typography variant="h1" component="h1" gutterBottom sx={{ color: "#fff", fontSize: { xs: '2rem', md: '4rem' } }}>Explore Events</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 8 }}>
          <TextField
            label="Search Events..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', md: '50%' }, backgroundColor: "#fff" }}
          />
          <FormControl variant="outlined" sx={{ width: { xs: '100%', md: '25%' }, backgroundColor: "#fff" }}>
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="">All events</MenuItem>
              <MenuItem value="Hardware Challenge">Hardware Challenge</MenuItem>
              <MenuItem value="Simulation Challenge">Simulation Challenge</MenuItem>
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Sports Challenge">Sports Challenge</MenuItem>
              <MenuItem value="Fun Activities">Fun Activities</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card
                sx={{
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
                  },
                  borderRadius: '15px',
                  overflow: 'hidden',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <CardHeader
                  title={event.title}
                  sx={{ backgroundColor: '#3f51b5', color: '#fff', textAlign: 'center' }}
                />
                <CardMedia
                  component="img"
                  height="200"
                  image={event.image}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {event.description}
                  </Typography>
                  <Box sx={{ mt: 4, spaceY: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{event.type}</span>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Users className="w-4 h-4 mr-2" />
                      <span>{event.groupSize} people</span>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="h6" component="span">${event.price}</Typography>
                  <Button variant="contained" color="primary">Register</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    
    </ThemeProvider>
  );
}