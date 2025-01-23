import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import logo from "../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/explore" },
    { label: "About", to: "/about" },
    { label: "Login", to: "/login" },
  ];

  return (
    <Toolbar sx={{ backgroundColor: "black" }}>
      <img
        src={logo}
        alt="Logo"
        style={{
          width: 60, // Increased size
          height: 60, // Increased size
          marginRight: 16,
          cursor: "pointer",
        }}
        onClick={() => window.location.href = "/"} // Redirect to home on logo click
      />
      <Typography
        variant="h6"
        component={Link} // Changed to Link component
        to="/"
        sx={{
          flexGrow: 1,
          fontFamily: "k2d",
          fontWeight: "bold",
          color: "white",
          letterSpacing: 1.2,
          textDecoration: "none", // Remove underline
        }}
      >
        TraJectory
      </Typography>
      {isMobile ? (
        <>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
          >
            <List sx={{ backgroundColor: "#6666ff", height: "100%" }}>
              {navItems.map((item) => (
                <ListItem
                  button
                  key={item.label}
                  component={Link}
                  to={item.to}
                  onClick={handleDrawerToggle}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#444",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      color: "white",
                      fontSize: 16,
                      "&:hover": {
                        color: "#ffd700",
                        textShadow: "0 0 8px #ffd700",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      ) : (
        navItems.map((item) => (
          <Button
            key={item.label}
            color="inherit"
            component={Link}
            to={item.to}
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
            {item.label}
          </Button>
        ))
      )}
    </Toolbar>
  );
};

export default Navbar;
