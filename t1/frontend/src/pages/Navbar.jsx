import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasTeam, setHasTeam] = useState(false); // Track team status

  // ✅ Fetch user & team info
  useEffect(() => {
    const updateUserData = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser?.name || "User");

          // ✅ Check if user has a team
          const storedTeam = localStorage.getItem("team");
          setHasTeam(!!storedTeam);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserName("User");
        }
      } else {
        setUserName("User");
      }
    };

    updateUserData();
    window.addEventListener("storage", updateUserData);
    return () => window.removeEventListener("storage", updateUserData);
  }, [location]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("team"); // ✅ Remove team on logout
    setIsLoggedIn(false);
    setUserName("User");
    setHasTeam(false);
    setAnchorEl(null);
    window.dispatchEvent(new Event("storage"));
    window.location.reload();
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#121212",
        padding: "5px 0",
        boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.3)",
      }}
    >
      
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 20px", height: "60px" }}>
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: isMobile ? 60 : 80,
              height: isMobile ? 60 : 80,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        </Link>

        {/* Navigation */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
            {["Home", "Explore", "About"].map((label, index) => (
              <Button
                key={index}
                component={Link}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                sx={{
                  color: "white",
                  margin: "0 12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "transform 0.3s, text-shadow 0.3s",
                  "&:hover": {
                    color: "#ffcc00",
                    transform: "scale(1.2)",
                    textShadow: "0px 0px 10px #ffcc00",
                  },
                }}
              >
                {label}
              </Button>
            ))}

            {/* ✅ Team Registration Button */}
            {isLoggedIn && (
              <Button
                component={Link}
                to="/teamregistration"
                sx={{
                  backgroundColor: hasTeam ? "#4CAF50" : "#F45558",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  marginLeft: "20px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    backgroundColor: hasTeam ? "#66bb6a" : "#ff6666",
                    transform: "scale(1.1)",
                    boxShadow: `0 0 15px ${hasTeam ? "#66bb6a" : "#ff6666"}`,
                  },
                }}
              >
                {hasTeam ? "Edit Team" : "Register Team"}
              </Button>
            )}

            {/* Profile Avatar with Dropdown */}
            {isLoggedIn ? (
              <>
                <IconButton onClick={handleAvatarClick} sx={{ marginLeft: "20px" }}>
                  <Avatar sx={{ bgcolor: "#F45558" }}>{userName.charAt(0).toUpperCase()}</Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#222",
                      color: "white",
                      boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                    },
                  }}
                >
                  <MenuItem disabled sx={{ fontWeight: "bold" }}>{userName.toUpperCase()}</MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "red", fontWeight: "bold" }}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: "#F45558",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  marginLeft: "20px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    backgroundColor: "#ff6666",
                    transform: "scale(1.1)",
                    boxShadow: "0 0 15px #ff6666",
                  },
                }}
              >
                Login
              </Button>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
              <List sx={{ backgroundColor: "#333", height: "100%" }}>
                {["Home", "Explore", "About"].map((label, index) => (
                  <ListItem button key={index} component={Link} to={label === "Home" ? "/" : `/${label.toLowerCase()}`} onClick={handleDrawerToggle}>
                    <ListItemText primary={label} sx={{ color: "white", textAlign: "center" }} />
                  </ListItem>
                ))}
                {isLoggedIn && (
                  <ListItem button component={Link} to="/team-registration" onClick={handleDrawerToggle}>
                    <ListItemText primary={hasTeam ? "Edit Team" : "Register Team"} sx={{ color: "white", textAlign: "center" }} />
                  </ListItem>
                )}
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
