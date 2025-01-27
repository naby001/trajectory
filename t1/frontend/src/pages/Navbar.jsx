import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in based on localStorage token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/explore" },
    { label: "About", to: "/about" },
    isLoggedIn ? { label: "Profile", to: "/profile" } : { label: "Login", to: "/login" },
  ];

  return (
    <Toolbar
      sx={{
        backgroundColor: "black",
        justifyContent: "space-between",
        padding: isMobile ? "0 8px" : "0 16px",
      }}
    >
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: isMobile ? 40 : 60,
            height: isMobile ? 40 : 60,
            marginRight: 16,
            cursor: "pointer",
          }}
        />
      </Link>
      <Typography
        variant="h6"
        component={Link}
        to="/"
        sx={{
          flexGrow: 1,
          fontFamily: "k2d",
          fontWeight: "bold",
          color: "white",
          letterSpacing: 1.2,
          textDecoration: "none",
          display: isMobile ? "none" : "block",
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
            <List
              sx={{ backgroundColor: "#6666ff", height: "100%" }}
              onClick={handleDrawerToggle}
            >
              {navItems.map((item) => (
                <ListItem
                  button
                  key={item.label}
                  component={Link}
                  to={item.to}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#444",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      color: location.pathname === item.to ? "#ffd700" : "white",
                      fontSize: 16,
                      fontWeight: location.pathname === item.to ? "bold" : "normal",
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
              color: location.pathname === item.to ? "#ffd700" : "white",
              fontSize: 16,
              fontWeight: location.pathname === item.to ? "bold" : "normal",
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
