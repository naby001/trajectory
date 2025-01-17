import React from "react";
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
  Avatar,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EmailIcon from "@mui/icons-material/Email";
import backgroundImage from "../assets/back.jpg";
import backgroundvid from "../assets/vid.mp4";
import Navbar from "./Navbar";

import { Link } from "react-router-dom";

const tours = [
  {
    id: 1,
    title: "Simulation Challenge",
    description:
      "Test your problem-solving skills with complex simulations and scenarios.",
    image:
      "https://images.pexels.com/photos/3862379/pexels-photo-3862379.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Case Study",
    description:
      "Dive deep into real-world engineering cases and come up with innovative solutions.",
    image:
      "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "General",
    description: "Quiz, Debate, Cultural events etc..",
    image:
      "https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Fun Activities",
    description:
      "Engage in exciting and interactive activities to unwind and have fun.",
    image:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    title: "Hardware Challenge",
    description:
      "Compete in designing innovative hardware solutions to real-world problems.",
    image:
      "https://images.pexels.com/photos/7869047/pexels-photo-7869047.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    title: "AI & Machine Learning Workshop",
    description:
      "Learn and implement the latest AI and machine learning techniques to solve modern problems.",
    image:
      "https://images.pexels.com/photos/190537/pexels-photo-190537.jpeg?auto=compress&cs=tinysrgb&w=600", // replace with a suitable image URL
  },
];

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "url(${backgroundImage})",
    text: "TourPlanner made our trip to India unforgettable!",
  },
  {
    id: 2,
    name: "Priya Singh",
    avatar: "url(${backgroundImage})",
    text: "The best way to explore India's hidden gems.",
  },
  {
    id: 3,
    name: "Amit Patel",
    avatar: "/placeholder.svg?height=50&width=50",
    text: "I've never had such a seamless travel experience before.",
  },
];

const destinations = [
  {
    id: 1,
    name: "Jaipur",
    image:
      "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=600?height=300&width=400",
  },
  {
    id: 2,
    name: "Kerala",
    image:
      "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=600?height=200&width=300",
  },
  {
    id: 3,
    name: "Goa",
    image:
      "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=400?height=300&width=400",
  },
  {
    id: 4,
    name: "Agra",
    image:
      "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400?height=300&width=400",
  },
];

function HomePage() {
  const [currentDestination, setCurrentDestination] = React.useState(0);

  const nextDestination = () => {
    setCurrentDestination((prev) => (prev + 1) % destinations.length);
  };

  const prevDestination = () => {
    setCurrentDestination(
      (prev) => (prev - 1 + destinations.length) % destinations.length
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        maxHeight: "100vh",
        // backgroundImage: url(),
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "225%",
          objectFit: "cover",
          zIndex: -1, // Ensures video stays behind content
        }}
      >
        <source src={backgroundvid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* nabvar */}
      <AppBar
        position="fixed"
        sx={{
          background: "#282a3a", // Gradient background
          boxShadow: "0px 4px 10px rgba(124, 6, 6, 0.3)", // Subtle shadow for depth

          // borderRadius:5,
          // width:900
        }}
      >
        <Navbar></Navbar>
      </AppBar>

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          backgroundColor: "rgba(23, 23, 17, 0.4)",
          py: 6,
        }}
      >
        <Typography
          component="h1"
          //variant="h2"
          align="center"
          color="white"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "white",
            mb: 1,
            fontFamily: "K2D",
            fontSize: 100,
            textShadow: `
                1px 1px 0px #ff8c00, 
                2px 2px 0px #ff4500, 
                3px 3px 0px #ff1493, 
                4px 4px 0px #9400d3, 
                5px 5px 0px #1e90ff, 
                6px 6px 0px #00fa9a
              `,
            marginTop: 10,
          }}
        >
          Welcome to Mechanical Tech Fest  yah
        </Typography>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            color: "#ffd700", // Golden color for text
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle shadow for text
            letterSpacing: 2,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive font size
          }}
        >
          Featured events
        </Typography>

        <Grid container spacing={4}>
          {tours.map((tour) => (
            <Grid item key={tour.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgba(139, 141, 144, 0.8)",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                  }}
                  image={tour.image}
                  alt={tour.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {tour.title}
                  </Typography>
                  <Typography>{tour.description}</Typography>
                </CardContent>
                <Button size="small" sx={{ m: 2 }}>
                  View Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.5)", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Featured Destinations
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              overflow: "hidden",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "white",
              }}
              onClick={prevDestination}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "white",
              }}
              onClick={nextDestination}
            >
              <ArrowForwardIosIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                transition: "transform 0.5s ease",
                transform: `translateX(-${currentDestination * 100}%)`,
              }}
            >
              {destinations.map((destination) => (
                <Box
                  key={destination.id}
                  sx={{
                    flexShrink: 0,
                    width: "100%",
                    height: 400,
                    backgroundImage: `url(${destination.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      p: 2,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {destination.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          What Our Travelers Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item key={testimonial.id} xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ mr: 2 }}
                  />
                  <Typography variant="subtitle1">
                    {testimonial.name}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  "{testimonial.text}"
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.7)",
          p: 6,
          mt: "auto",
        }}
        component="footer"
      >
        <Typography variant="h6" align="center" gutterBottom>
          Ready to start your adventure?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            display: "block",
            mx: "auto",
            mt: 2,
            backgroundColor: "blue",
            color: "white",
          }}
        >
          Create Your Tour Now
        </Button>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <EmailIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: { backgroundColor: "white" },
            }}
            sx={{ mr: 2 }}
          />
          <Button
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
          >
            Subscribe to Newsletter
          </Button>
        </Box>
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
          sx={{ mt: 3 }}
        >
          © {new Date().getFullYear()} TourPlanner. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;
