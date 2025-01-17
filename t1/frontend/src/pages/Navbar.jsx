import React from "react";
import { Link } from "react-router-dom";
import { Toolbar, Typography, Button } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";

const Navbar = () => {
  return (
    <Toolbar>
      <ExploreIcon
        sx={{
          mr: 2,
          color: "white",
          fontSize: 28,
          "&:hover": {
            color: "#ffd700", // Golden glow on hover
            textShadow: "0 0 8px #ffd700",
          },
        }}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          fontFamily: "k2d",
          fontWeight: "bold",
          color: "white",
          letterSpacing: 1.2,
        }}
      >
        TraJectory
      </Typography>
      <Button
        color="inherit"
        component={Link}
        to="/explore"
        sx={{
          color: "white",
          fontSize: 16,
          "&:hover": {
            color: "#ffd700",
            transform: "scale(1.1)", // Slight enlargement on hover
          },
          transition: "transform 0.2s, color 0.2s",
        }}
      >
        Explore
      </Button>
      <Button
        color="inherit"
        component={Link}
        to=""
        sx={{
          color: "white",
          fontSize: 16,
          "&:hover": {
            color: "#ffd700",
            transform: "scale(1.1)",
          },
          transition: "transform 0.2s, color 0.2s",
        }}
      >
        Plan Your Trip
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/magazine"
        sx={{
          color: "white",
          fontSize: 16,
          "&:hover": {
            color: "#ffd700",
            transform: "scale(1.1)",
          },
          transition: "transform 0.2s, color 0.2s",
        }}
      >
        Magazine
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/about"
        sx={{
          color: "white",
          fontSize: 16,
          "&:hover": {
            color: "#ffd700",
            transform: "scale(1.1)",
          },
          transition: "transform 0.2s, color 0.2s",
        }}
      >
        About
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/login"
        sx={{
          color: "white",
          fontSize: 16,
          "&:hover": {
            color: "#ffd700",
            transform: "scale(1.1)",
          },
          transition: "transform 0.2s, color 0.2s",
        }}
      >
        Login
      </Button>
    </Toolbar>
  );
};

export default Navbar;
