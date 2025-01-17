import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Image from "./back.webp"

const Navbar = () => (
  <AppBar position="fixed" sx={{ backgroundColor: "#333", boxShadow: "none" }}>
    <Toolbar>
      <img src="/placeholder.svg" alt="Gigaplay Logo" width="40" height="40" />
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, marginLeft: 2, fontWeight: "bold" }}
      >
        Gigaplay
      </Typography>
      <IconButton edge="end" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

const Hero = () => (
  <Container
    maxWidth="lg"
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundImage: `url(${Image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      padding: "2rem",
      gap: 2,
    }}
  >
    <Typography
      variant="h2"
      component="h1"
      gutterBottom
      sx={{ fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}
    >
      Join the Game
    </Typography>
    <Typography
      variant="h6"
      component="p"
      gutterBottom
      sx={{ maxWidth: "600px", lineHeight: 1.5 }}
    >
      Enter a world of infinite possibilities where gaming meets the future.
      Experience next-generation gameplay with cutting-edge technology and
      immersive experiences.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      size="large"
      sx={{
        padding: "0.8rem 2rem",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      Explore
    </Button>
  </Container>
);

const EventCard = ({ event }) => (
  <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
    <CardMedia
      component="img"
      height="160"
      image={event.image || "/placeholder.svg"}
      alt={event.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {event.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {event.description}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
      <Box display="flex" alignItems="center" gap={1}>
        <EventIcon fontSize="small" />
        <Typography variant="body2" color="text.secondary">
          {new Date(event.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <PeopleIcon fontSize="small" />
        <Typography variant="body2" color="text.secondary">
          {event.players} Players
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <MonetizationOnIcon fontSize="small" />
        <Typography variant="body2" color="text.secondary">
          Prize: {event.prize}
        </Typography>
      </Box>
    </CardActions>
  </Card>
);

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Cyberpunk Tournament",
      date: "2024-02-15",
      image:
        "https://images.pexels.com/photos/1231231/pexels-photo-1231231.jpeg",
      description:
        "Join the ultimate cyberpunk gaming tournament with prizes worth $10,000",
      players: 128,
      prize: "$10,000",
    },
    {
      id: 2,
      title: "VR Championship",
      date: "2024-02-20",
      image:
        "https://images.pexels.com/photos/1231232/pexels-photo-1231232.jpeg",
      description:
        "Experience virtual reality gaming at its finest in this championship event",
      players: 64,
      prize: "$5,000",
    },
    {
      id: 3,
      title: "Esports League",
      date: "2024-02-25",
      image:
        "https://images.pexels.com/photos/1231233/pexels-photo-1231233.jpeg",
      description:
        "Compete in our monthly esports league featuring multiple game titles",
      players: 256,
      prize: "$15,000",
    },
    {
      id: 4,
      title: "Retro Gaming Night",
      date: "2024-03-01",
      image:
        "https://images.pexels.com/photos/1231234/pexels-photo-1231234.jpeg",
      description: "A nostalgic night of classic gaming with a modern twist",
      players: 32,
      prize: "$2,000",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "4rem 0" }}>
      <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
        Upcoming Events
      </Typography>
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const Page = () => (
  <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    <Navbar />
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: { xs: "column", md: "row" }, // Stack on small screens
        overflow: "hidden",
      }}
    >
      <Box sx={{ flex: 1, minHeight: "100vh", display: "flex" }}>
        <Hero />
      </Box>
      <Box sx={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
        <EventsSection />
      </Box>
    </Box>
  </Box>
);

export default Page;

