import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../assets/logo.png";
import axios from "axios";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasTeam, setHasTeam] = useState(false);
  const [inviteCount, setInviteCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleComingSoon = () => {
    alert("Coming Soon");
  };

  // ✅ Fetch user & team info
  useEffect(() => {
    const updateUserData = async () => {
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

          // ✅ Fetch pending invites count
          if (token && token !== "null" && token !== "undefined") {
            try {
              const response = await axios.get("http://localhost:5000/api/team/invites", {
                headers: { Authorization: `Bearer ${token}` },
              });
          
              if (response.status === 200) {
                setInviteCount(response.data.length);
              }
            } catch (err) {
              console.error("Error fetching invites:", err.response?.data || err.message);
              if (err.response?.status === 401) {
                localStorage.removeItem("token"); // Clear invalid token
                setIsLoggedIn(false);
              }
            }
          }
          
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

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName("User");
    setHasTeam(false);
    setInviteCount(0);
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
        background: "rgba(28, 27, 31, 0.8)", // Transparent background
        backdropFilter: "blur(10px)", // Backdrop filter for blur effect
        padding: "5px 0",
      }}
    >
      
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 20px", height: "60px" }}>
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: isMobile ? 120 : 150, // Adjusted width
              height: isMobile ? 50 : 50, // Adjusted height
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        </Link>

        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuToggle}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Navigation */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
            {["Home", "Explore", "About"].map((label, index) => (
              <Button
                key={index}
                component={label === "Explore" ? "button" : Link}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                onClick={label === "Explore" ? handleComingSoon : undefined}
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

            {/* ✅ Show only if logged in */}
            {isLoggedIn && (
              <>
                {/* Remove Team Registration Button */}
                {/* Invitations Button */}
                {inviteCount > 0 && (
                  <IconButton component={Link} to="/invites" sx={{ marginLeft: "20px", color: "white" }}>
                    <Badge badgeContent={inviteCount} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                )}

                {/* ✅ Profile Avatar with Dropdown */}
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
            )}

            {/* ✅ Show login button only if NOT logged in */}
            {!isLoggedIn && (
              <Button
                component="button"
                onClick={handleComingSoon}
                sx={{
                  backgroundColor: "#F45558", // Updated to red
                  color: "#FFFFFF", // Updated to white
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
          <Menu
            anchorEl={anchorEl}
            open={mobileMenuOpen}
            onClose={handleMobileMenuToggle}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#1C1B1F", // Updated to black
                color: "#FFFFFF", // Updated to white
                boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
              },
            }}
          >
            {["Home", "Explore", "About"].map((label, index) => (
              <MenuItem
                key={index}
                component={label === "Explore" ? "button" : Link}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                onClick={label === "Explore" ? handleComingSoon : handleMobileMenuToggle}
              >
                {label}
              </MenuItem>
            ))}
            {/* Show only if logged in */}
            {isLoggedIn && (
              <>
                <MenuItem
                  component={Link}
                  to="/teamregistration"
                  onClick={handleMobileMenuToggle}
                >
                  {hasTeam ? "Edit Team" : "Register Team"}
                </MenuItem>
                {inviteCount > 0 && (
                  <MenuItem
                    component={Link}
                    to="/invites"
                    onClick={handleMobileMenuToggle}
                  >
                    Invitations ({inviteCount})
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout} sx={{ color: "red", fontWeight: "bold" }}>
                  Logout
                </MenuItem>
              </>
            )}
            {!isLoggedIn && (
              <MenuItem
                component="button"
                onClick={handleComingSoon}
              >
                Login
              </MenuItem>
            )}
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
