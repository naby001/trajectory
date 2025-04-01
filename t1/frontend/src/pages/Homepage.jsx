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
// import MeetOurTeam from "../components/Team";

import edclassroom from "../assets/edclassroom.jpg";
import microhydro from "../assets/microhydro.jpg";
import versAttiresLogo from "../assets/vers-attires-logo.png"; // Import Vers Attires logo
import exideLogo from "../assets/exide-logo.png"; // Import Exide logo
import webskittersLogo from "../assets/webskitters.png"; // Import Webskitters logo

import Squares from "../components/Square";
import "../components/MeetOurTeam.css"; // Fix the import path

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
    title: "3D Design Battle",
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
      "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
    name: "Mechanical Engineering Department",
    image:
      "https://res.cloudinary.com/dig63yzxi/image/upload/v1740909479/L_v8wbsy.jpg",
  },
  {
    id: 2,
    name: "Hydraulics Laboratory",
    image:
      "https://res.cloudinary.com/dig63yzxi/image/upload/v1740909890/b_jfa5pg.jpg",
  },
  {
    id: 3,
    name: "Heat Power Laboratory",
    image:
      "https://res.cloudinary.com/dig63yzxi/image/upload/v1740909994/f_wdydqq.jpg",
  },
  {
    id: 4,
    name: "Blue Earth Machine Shop",
    image:
      "https://res.cloudinary.com/dig63yzxi/image/upload/v1740910052/g_wkyodj.jpg",
  },
  {
    id: 5,
    name: "Playground",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipPiTbxdJpMtj2MNCUWrZ7h__6jGr2iL4ft9QZeX=s1360-w1360-h1020",
  },
  {
    id: 6,
    name: "ED Classroom",
    image: edclassroom,
  },

  {
    id: 7,
    name: "Jadavpur University Gate",
    image:
      "https://res.cloudinary.com/dig63yzxi/image/upload/v1740910145/h_uinwlz.jpg",
  },
  {
    id: 8,
    name: "Micro Hydro Project",
    image: microhydro,
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
          zIndex: 1, // Ensure this container is properly layered
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal" // up, down, left, right, diagonal
            borderColor="#fff"
            hoverFillColor="#222"
          />
        </div>

        {/* Heading */}
        <Box
          sx={{
            mt: 14,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
        <AppBar position="fixed" sx={{ background: "#1C1B1F", zIndex: 2 }}>
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
        <br></br>

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
                  <Grid
                    item
                    key={tour.id}
                    xs={12}
                    sm={6}
                    md={6}
                    className="event-card"
                  >
                    <Box
                      onClick={() => handleCardClick(tour.title)}
                      sx={{ cursor: "pointer" }}
                    >
                      <Card
                        sx={{
                          height: "100%",
                          position: "relative",
                          overflow: "hidden",
                          backgroundColor: "rgba(28, 27, 31, 0.9)",
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
                        <CardContent
                          sx={{ textAlign: "center", color: "white" }}
                        >
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
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Fade>

        {/* <MeetOurTeam /> */}

        {/* Where You Find Us? */}
        <Fade in={true} timeout={1000}>
          <Box className="fade-in" sx={{ py: 8, color: "white" }}>
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                align="center"
                className="michroma"
                gutterBottom
              >
                Find Us In
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, sm: 400 }, // Adjust height for responsiveness
                  overflow: "hidden",
                  zIndex: 1, // Ensure this section is above the background
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3, // Ensure navigation buttons are above the carousel
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
                    zIndex: 3, // Ensure navigation buttons are above the carousel
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
                        variant="h5"
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

        {/* Sponsors Section */}

        <Box 
          component="section" 
          sx={{ 
            py: 6, 
           
            zIndex: 0  // Changed from 1 to 0 to ensure it's below the navbar

          }}
          className="fade-in"
        >
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h2"
              align="center"
              className="michroma"
              sx={{
                mb: 5,
                color: "#fff",
                position: "relative",
                zIndex: 1, // Changed from 2 to 1
              }}
            >
              Our Sponsors
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 4,
                position: "relative",
                zIndex: 1, // Changed from 2 to 1
              }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  width: 280,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#000000",
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  border: "1px solid #D4AF37",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 20px rgba(212, 175, 55, 0.6)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, color: "#D4AF37" }}
                  className="exo-2-bold"
                >
                  Associate Sponsor
                </Typography>

                <Box
                  component="img"
                  src={versAttiresLogo}
                  alt="Vers Attires"
                  sx={{
                    width: 220,
                    height: "auto",
                    mb: 2,
                    objectFit: "contain",
                  }}
                />

                <Typography
                  variant="body1"
                  align="center"
                  sx={{ color: "#D4AF37" }}
                  className="exo-2-regular"
                >
                  Fashion Redefined
                </Typography>
              </Paper>
              
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  width: 280,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#000000",
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  border: "4px solid #e60000",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 20px rgba(230, 0, 0, 0.6)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, color: "#e60000" }}
                  className="exo-2-bold"
                >
                  Co-Sponsor
                </Typography>
                <br></br><br></br><br></br>
                <Box
                  component="img"
                  src={exideLogo}
                  alt="Exide"
                  sx={{
                    width: 220,
                    height: "auto",
                    mb: 2,
                    objectFit: "contain",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                />
               <br></br><br></br><br></br>
               <Typography
  variant="body1"
  align="center"
  sx={{ color: "#e60000", fontWeight: "bold" }}
  className="exo-2-regular"
>
  Powering the Future
</Typography>
              </Paper>
              
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  width: 280,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#000000",
                  borderRadius: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  border: "1px blue solid",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 20px rgba(55, 175, 212, 0.6)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, color: "rgba(0, 195, 255, 0.6)" }}
                  className="exo-2-bold"
                >
                  Associate Sponsor
                </Typography>
                <br></br><br></br><br></br>
                <Box
                  component="img"
                  src={webskittersLogo}
                  alt="Webskitters"
                  sx={{
                    width: 220,
                    height: "auto",
                    mb: 2,
                    objectFit: "contain",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}
                />
                 <br></br><br></br><br></br>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ color: "rgba(0, 195, 255, 0.6)" }}
                  className="exo-2-regular"
                >
                  A national award winning company
                </Typography>
              </Paper>
            </Box>
          </Container>


          
          
          

        </Box>

        {/* Organisers Section */}
        <Fade in={true} timeout={1000}>
          <Box
            className="fade-in"
            sx={{
              py: 8,
              color: "white",
              position: "relative",
              zIndex: 0,
            }}
          >
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                align="center"
                className="michroma"
                gutterBottom
                sx={{ mb: 6 }}
              >
                Our Organisers
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                {[

                  { name: "Himoprovo Chowdhury", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743362373/my/bwrzuqpx857uye6bgmw3.jpg" },
                  { name: "Arijit Mandal", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743362520/my/a6v01xfow0ntve4oog9g.jpg" },
                  { name: "Srija Mondal", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743363490/my/cdnogiksfo65fehn5qjv.png" },
                  { name: "Abhranuj Podder", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743362559/my/oz61wtultyubwu8mb6aa.jpg" },
                  { name: "Subhranuj Podder", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743363536/my/dy8ns9nqe9s6fiskyhdy.png" },
                  { name: "Mrinmoy Tarafdar", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743362448/my/saor9vtzo3ehkjklbbdr.jpg" },
                  { name: "Sayan Das", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743362369/my/fe6rkioivhypms7c4sx8.jpg" },
                  { name: "Nabyendu Das", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1741952758/my/nc8nkkhw46lins64niuz.png" },
                  { name: "Koustav Das", linkedin: "#", image: "https://res.cloudinary.com/dig63yzxi/image/upload/v1741957639/koustav_bzxwnq.jpg" },
                  { name: "Souvik Howlader", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743363710/my/zujkm7yqjz1rupkrebov.jpg" },
                  { name: "Satyam Roy", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743362364/my/ejjkxi6le7lndot3khu7.jpg" },
                  { name: "Arkabrata Das", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743362345/my/p7ktlal65pcjuy5o3vi3.jpg" },
                  { name: "Soumyojit Biswas", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743363912/gtnnf1hfibhywamckejs.png" },
                  { name: "Suprabhat Das", linkedin: "#", image: "https://res.cloudinary.com/dz4ooxird/image/upload/v1743362355/my/pfnwdqwmewyoybrcx0e4.jpg" }

                ].map((member, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Fade in={true} timeout={1000}>
                      <Card className="our-team">
                        <Box className="picture">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              style={{
                                width: "130px",
                                height: "130px",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: "130px",
                                height: "130px",
                                fontSize: "2.5rem",
                              }}
                            >
                              {member.name.charAt(0)}
                            </Avatar>
                          )}
                        </Box>
                        <CardContent className="team-content">
                          <Typography variant="h6" className="name">
                            {member.name}
                          </Typography>
                          <Box className="social">
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LinkedInIcon />
                            </a>
                          </Box>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Fade>

        {/* Footer */}
        <Fade in={true} timeout={1000}>
          <Box
            className="fade-in"
            sx={{
              bgcolor: "rgb(0, 0, 0)",

              p: 3, // Reduced padding
              mt: "auto",
            }}
            component="footer"
          >
            <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
              <Button
                variant="outlined"
                href="https://linktr.ee/trajectoryjumech?fbclid=PAZXh0bgNhZW0CMTEAAaajz1I4w0OH00Qw7UtFQyHtOTuEdyiokldRelhsoZ4jyZgJvdnJ57qURH4_aem_KOr5iI6NgY0WGz17PuGT3A"
                sx={{
                  color: "rgb(187, 83, 84)",
                  borderColor: "rgb(187, 83, 84)",
                }} // Updated button color
              >
                Subscribe to Social Media
              </Button>
            </Box>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              {" "}
              {/* Reduced margin-top */}
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
