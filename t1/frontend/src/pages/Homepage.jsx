import React, { useEffect } from "react";
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
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto"; // Import Roboto font
import "@fontsource/lobster"; // Import Lobster font
import "@fontsource/open-sans"; // Import Open Sans font
import CarRoadmap from "../components/CarRoadmap"; // Import the CarRoadmap component
import InfiniteScrollAnimation from "../components/infinity"; // Import the InfiniteScrollAnimation component
import GlitchText from "../components/GlitchText";
import videoSrc from "../assets/v.mp4"; // Ensure this path is correct

const theme = createTheme({
  typography: {
    fontFamily: "Exo 2, Arial",
    h1: {
      fontFamily: "Michroma, Arial",
    },
    h4: {
      fontFamily: "Michroma, Arial",
    },
  },
  palette: {
    primary: {
      main: "#1C1B1F",
    },
    secondary: {
      main: "rgb(187, 83, 84)",
    },
  },
});

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
    title: "Sports Challenge",
    description:
      "Dive deep into real-world engineering cases and come up with innovative solutions.",
    image:
      "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "General",
    description: "Quiz, Debate, Cultural events etc..",
    image:
      "https://viralsolutions.net/wp-content/uploads/2019/06/shutterstock_749036344.webp",
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
    title: "Mystery Event?",
    description: "Event closes with a banger",
    image:
      "https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sourav Sarkar",
    avatar: "https://via.placeholder.com/150",
    text: "The event was incredibly well-organized and inspiring. I learned so much and met amazing people!",
  },
  {
    id: 2,
    name: "Himoprovo",
    avatar: "https://via.placeholder.com/150",
    text: "This was the perfect way to discover the hidden gems of JU. I never knew our campus had so much to offer!",
  },
  {
    id: 3,
    name: "Raju Da",
    avatar: "https://via.placeholder.com/150",
    text: "A truly unforgettable experience. The organizers went above and beyond to make it special for everyone.",
  },
];

const destinations = [
  {
    id: 1,
    name: "Mechanical Department",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNFES13e38ErdouLsTOOg3bLR9eOeokcMRXVc0c=s1360-w1360-h1020",
  },
  {
    id: 2,
    name: "Playground",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipOUccatxSmzPhxPiiGjKlywuohaPcLe_LCNce94=s1360-w1360-h1020",
  },
  {
    id: 3,
    name: "Playground",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipPiTbxdJpMtj2MNCUWrZ7h__6jGr2iL4ft9QZeX=s1360-w1360-h1020",
  },
  {
    id: 4,
    name: "Mechanical Department",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipPiNJJwo8Zm5JsHLqmoyL3PhlPFybcvYTExE_Fv=s1360-w1360-h1020",
  },
];

function HomePage() {
  const navigate = useNavigate();

  // When a card's SEE MORE is clicked, show an alert for "Coming Soon".
  const handleCardClick = (type) => {
    navigate(`/explore?filter=${type}`);
  };

  const [currentDestination, setCurrentDestination] = React.useState(0);

  const nextDestination = () => {
    setCurrentDestination((prev) => (prev + 1) % destinations.length);
  };

  const prevDestination = () => {
    setCurrentDestination(
      (prev) => (prev - 1 + destinations.length) % destinations.length
    );
  };

  React.useEffect(() => {
    const interval = setInterval(nextDestination, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "opacity 1s ease-in-out";
          entry.target.style.opacity = 1;
        } else {
          entry.target.style.opacity = 0;
        }
      });
    });

    document.querySelectorAll(".fade-in").forEach((element) => {
      element.style.opacity = 0;
      observer.observe(element);
    });

    // Observe each event card
    document.querySelectorAll(".event-card").forEach((element) => {
      element.style.opacity = 0;
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');`}
        {`@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');`}
        {`.exo-2-regular { font-family: "Exo 2", serif; font-optical-sizing: auto; font-weight: 400; font-style: normal; }`}
        {`.exo-2-bold { font-family: "Exo 2", serif; font-optical-sizing: auto; font-weight: 700; font-style: normal; }`}
        {`.michroma { font-family: "Michroma", sans-serif; }`}
      </style>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundImage: "url('path/to/your/background/image.jpg')", // Add this line to set the background image
          position: "relative",
          top: 0, // Change from -70 to 0
          backgroundColor: "#1C1B1F", // Set consistent background color
          overflow: "hidden", // Ensure content stays within screen boundaries
        }}
      >
        {/* Heading */}
        <Box sx={{ mt: 14, justifyContent: "center" ,alignItems: "center", display: "flex", flexDirection: "column" }}>  
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="custom-class"
          >
            Trajectory 
          </GlitchText>
          <br></br>
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="custom-class"
          >
            2k25
          </GlitchText>
          
        </Box>
        

        {/* Video below the heading */}
        {/* <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 20 }}>
          <video
            width="50%"
            height="auto"
            controls
            style={{ maxHeight: "500px" }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box> */}

        {/* Navbar */}
        <AppBar position="fixed" sx={{ background: "#1C1B1F" }}>
          <Navbar />
        </AppBar>
          


        {/* Infinite Scroll Animation */}
        <Box sx={{ overflow: "hidden" }}>
          <InfiniteScrollAnimation />
        </Box>

        {/* Car Roadmap */}
        <Fade in={true} timeout={1000}>
          <Box className="fade-in" sx={{ py: 8 }}>
            <CarRoadmap />
          </Box>
        </Fade>
        <br>
        </br>

        {/* Featured Events */}
        <Fade in={true} timeout={1000}>
          <Container className="fade-in" sx={{ py: 8 }} maxWidth="lg">
            <Typography
              variant="h4"
              align="center"
              className="michroma"
              sx={{
                fontWeight: "bold",
                mb: 4,
                color: "rgb(187, 83, 84)", // Updated text color
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Featured Events
            </Typography>

            <Grid container spacing={4}>
              {tours.map((tour, index) => {
                const glowColor = [
                  "#FF0000", // Red
                  "#00FF00", // Green
                  "#0000FF", // Blue
                  "#FFFF00", // Yellow
                  "#FF00FF", // Purple
                  "#00FFFF", // Cyan
                ][index];
                return (
                  <Grid item key={tour.id} xs={12} sm={6} md={6} className="event-card">
                    <Card
                      sx={{
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transition: "transform 0.5s, box-shadow 0.5s",
                        transform:
                          "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                        borderRadius: "16px", // Increase border radius
                        "&:hover": {
                          transform:
                            "perspective(1000px) rotateX(5deg) rotateY(5deg) scale(0.95)",
                          boxShadow: `0 0 20px ${glowColor}, 0 0 30px ${glowColor}, 0 0 40px ${glowColor}`,
                        },
                      }}
                    >
                      {/* Glowing Background Effect */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: `radial-gradient(circle, ${
                            [
                              "rgba(255, 0, 0, 0.3)",
                              "rgba(0, 255, 0, 0.3)",
                              "rgba(0, 0, 255, 0.3)",
                              "rgba(255, 255, 0, 0.3)",
                              "rgba(255, 0, 255, 0.3)",
                              "rgba(0, 255, 255, 0.3)",
                            ][index]
                          }, transparent)`,
                          filter: "blur(15px)",
                          opacity: 0,
                          transition: "opacity 0.5s",
                          zIndex: -1,
                          // Keep the existing effect and let the card hover add more glow
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                      />

                      {/* Card Image */}
                      <Box sx={{ overflow: "hidden", position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={tour.image}
                          alt={tour.title}
                          sx={{
                            filter: "grayscale(100%) brightness(50%)",
                            transition: "all 0.5s ease-in-out",
                            "&:hover": {
                              filter:
                                "grayscale(0%) brightness(100%) drop-shadow(0 0 20px white)",
                            },
                          }}
                        />
                      </Box>

                      {/* Card Content */}
                      <CardContent sx={{ textAlign: "center", color: "white" }}>
                        {/* Date-like Badge on Top */}
                        

                        <Typography
                          gutterBottom
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            transition: "color 0.3s",
                            "&:hover": {
                              color: "#FFD700",
                              textShadow: "0 0 10px #FFD700",
                            },
                          }}
                        >
                          {tour.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: "gray" }}>
                          {tour.description}
                        </Typography>

                        {/* See More Button with Navigation */}
                        <Button
                          onClick={() => handleCardClick(tour.title)}
                          sx={{
                            marginTop: "10px",
                            color: "white",
                            fontWeight: "bold",
                            "&:hover": {
                              color: [
                                "#FF0000",
                                "#00FF00",
                                "#0000FF",
                                "#FFFF00",
                                "#FF00FF",
                                "#00FFFF",
                              ][index],
                              textShadow: `0 0 10px ${
                                [
                                  "#FF0000",
                                  "#00FF00",
                                  "#0000FF",
                                  "#FFFF00",
                                  "#FF00FF",
                                  "#00FFFF",
                                ][index]
                              }`,
                            },
                          }}
                        >
                          SEE MORE
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Fade>

        {/* Where You Find Us? */}
        <Fade in={true} timeout={1000}>
          <Box
            className="fade-in"
            sx={{ py: 8, color: "white" }}
          >
            <Container maxWidth="lg">
              <Typography variant="h4" align="center" className="michroma" gutterBottom>
                Where You Find Us?
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, sm: 400 }, // Adjust height for responsiveness
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
                        height: { xs: 300, sm: 400 }, // Adjust height for responsiveness
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
        </Fade>

        {/* Footer */}
        <Fade in={true} timeout={1000}>
          <Box
            className="fade-in"
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.7)",
             
              p: 3, // Reduced padding
              mt: "auto",
              
            }}
            component="footer"
          >
            <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
            <Button
  variant="outlined"
  href="https://linktr.ee/trajectoryjumech?fbclid=PAZXh0bgNhZW0CMTEAAaajz1I4w0OH00Qw7UtFQyHtOTuEdyiokldRelhsoZ4jyZgJvdnJ57qURH4_aem_KOr5iI6NgY0WGz17PuGT3A"
  sx={{ color: "rgb(187, 83, 84)", borderColor: "rgb(187, 83, 84)" }} // Updated button color
>
  Subscribe to Social Media
</Button>
            </Box>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}> {/* Reduced margin-top */}
              <IconButton
                component="a"
                href="https://www.linkedin.com/company/trajectoryjumech/"
                target="_blank"
                sx={{ color: "rgb(187, 83, 84)" }} // Updated icon button color
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/trajectory_jumech/"
                target="_blank"
                sx={{ color: "rgb(187, 83, 84)" }} // Updated icon button color
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.facebook.com/profile.php?id=61572408332143"
                target="_blank"
                sx={{ color: "rgb(187, 83, 84)" }} // Updated icon button color
              >
                <FacebookIcon />
              </IconButton>
            </Box>
            <Typography
              variant="subtitle1"
              align="center"
              color="white"
              component="p"
              className="exo-2-regular"
              sx={{ mt: 2 }} // Reduced margin-top
            >
              © {new Date().getFullYear()} Trajectory. All rights reserved.
            </Typography>
          </Box>
        </Fade>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;
