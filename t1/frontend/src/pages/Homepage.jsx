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
    text: "Best event yet organised",
  },
  {
    id: 2,
    name: "Himoprovo",
    avatar: "https://via.placeholder.com/150",
    text: "The best way to explore JU's hidden gems.",
  },
  {
    id: 3,
    name: "Raju Da",
    avatar: "https://via.placeholder.com/150",
    text: "The best way to explore JU's hidden gems.",
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
    name: "Agra",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipPiNJJwo8Zm5JsHLqmoyL3PhlPFybcvYTExE_Fv=s1360-w1360-h1020",
  },
];

function HomePage() {
  const navigate = useNavigate();

  // When a card's SEE MORE is clicked, navigate to the Explore page with the tour title as filter.
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
          backgroundColor: "black", // Change background color to black
        }}
      >
        {/* Navbar */}
        <AppBar position="fixed" sx={{ background: "#282a3a" }}>
          <Navbar />
        </AppBar>

        {/* Main Content */}
        <Fade in={true} timeout={1000}>
          <Box
            className="fade-in"
            sx={{
              mt: 8,
              py: 6,
              color: "white",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Website in Progress Header */}
            <Box
              sx={{
                width: "100%",
                backgroundColor: "rgba(245, 248, 106, 0.5)",
                color: "white",
                textAlign: "center",
                py: 1,
              }}
            >
              <Typography variant="h6">Website Still in Progress</Typography>
            </Box>
            {/* Website in Progress Header */}
            
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                fontWeight: "bold",
                textShadow: `
                  1px 1px 0px #ff8c00, 
                  2px 2px 0px #ff4500, 
                  3px 3px 0px #ff1493, 
                  4px 4px 0px #9400d3, 
                  5px 5px 0px #1e90ff, 
                  6px 6px 0px #00fa9a
                `,
              }}
            >
              Welcome to Mechanical Tech Fest
            </Typography>
          </Box>
        </Fade>

        {/* Slideshow Section */}
        <Fade in={true} timeout={1000}>
          <Box
            className="fade-in"
            sx={{ bgcolor: "rgba(0, 0, 0, 0.5)", py: 8, color: "white" }}
          >
            <Container maxWidth="lg">
              <Typography variant="h4" align="center" gutterBottom>
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
              sx={{
                fontWeight: "bold",
                mb: 4,
                color: "#ffd700",
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
                        <Box
                          sx={{
                            display: "inline-block",
                            backgroundColor: [
                              "#FF0000",
                              "#00FF00",
                              "#0000FF",
                              "#FFFF00",
                              "#FF00FF",
                              "#00FFFF",
                            ][index],
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                          }}
                        >
                          {`JUNE ${29 + index}`}
                        </Box>

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

        {/* Footer */}
        <Fade in={true} timeout={1000}>
          <Container
            className="fade-in"
            sx={{ py: 8, color: "white" }}
            maxWidth="md"
          >
            <Typography variant="h4" align="center" gutterBottom>
              What Our Organisers Say
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
        </Fade>

        <Fade in={true} timeout={1000}>
          <Box
            className="fade-in"
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
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white" }}
              >
                Subscribe to Social Media
              </Button>
            </Box>
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <IconButton
                component="a"
                href="https://www.linkedin.com/company/trajectoryjumech/"
                target="_blank"
                sx={{ color: "white" }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/trajectory_jumech/"
                target="_blank"
                sx={{ color: "white" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.facebook.com/profile.php?id=61572408332143"
                target="_blank"
                sx={{ color: "white" }}
              >
                <FacebookIcon />
              </IconButton>
            </Box>
            <Typography
              variant="subtitle1"
              align="center"
              color="white"
              component="p"
              sx={{ mt: 3 }}
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
