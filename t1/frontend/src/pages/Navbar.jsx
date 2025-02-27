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
  const [hasTeam, setHasTeam] = useState(false);
  const [inviteCount, setInviteCount] = useState(0);

  // Avatar dropdown anchor
  const [anchorEl, setAnchorEl] = useState(null);

  // For the mobile menu, we no longer rely on an anchorEl
  // We'll just use a boolean to show/hide it.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleComingSoon = () => {
    alert("Coming Soon");
  };

  // ----------------------------------------
  // Fetch user & team info
  // ----------------------------------------
  useEffect(() => {
    const updateUserData = async () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser?.name || "User");

          const storedTeam = localStorage.getItem("team");
          setHasTeam(!!storedTeam);

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

  // ----------------------------------------
  // Handlers
  // ----------------------------------------
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

  // ----------------------------------------
  // Render
  // ----------------------------------------
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(28, 27, 31, 0.8)", // Transparent background
        backdropFilter: "blur(10px)",        // Backdrop filter for blur effect
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
              width: isMobile ? 120 : 150,
              height: 50,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        </Link>

        {/* MOBILE: Hamburger Icon */}
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMobileMenuToggle}>
            <MenuIcon />
          </IconButton>
        )}

        {/* DESKTOP: Navigation */}
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
                  transition: "transform 0.3s, textShadow 0.3s",
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

            {/* If logged in */}
            {isLoggedIn && (
              <>
                {inviteCount > 0 && (
                  <IconButton component={Link} to="/invites" sx={{ marginLeft: "20px", color: "white" }}>
                    <Badge badgeContent={inviteCount} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                )}

                {/* Avatar Menu */}
                <IconButton onClick={handleAvatarClick} sx={{ marginLeft: "20px" }}>
                  <Avatar sx={{ bgcolor: "#F45558" }}>
                    {userName.charAt(0).toUpperCase()}
                  </Avatar>
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
                  <MenuItem disabled sx={{ fontWeight: "bold" }}>
                    {userName.toUpperCase()}
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "red", fontWeight: "bold" }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* If not logged in */}
            {!isLoggedIn && (
              <Button
                component="button"
                onClick={handleComingSoon}
                sx={{
                  backgroundColor: "#F45558",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  marginLeft: "20px",
                  transition: "transform 0.3s, boxShadow 0.3s",
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

        {/* MOBILE: Right-Side, Full-Height, Thin Menu */}
        {isMobile && (
          <Menu
            // Instead of anchoring to the button, we position it at the far right
            open={mobileMenuOpen}
            onClose={handleMobileMenuToggle}
            anchorReference="anchorPosition"
            // Large left coordinate so it clamps to the screen's right edge
            anchorPosition={{ top: 0, left: 9999999 }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                width: "150px",          // Thin width
                height: "100vh",         // Full vertical coverage
                backgroundColor: "#1C1B1F",
                color: "#FFFFFF",
                boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                borderRadius: 0,
                overflowY: "auto",
              },
            }}
          >
            {["Home", "Explore", "About"].map((label, index) => (
              <MenuItem
                key={index}
                component={label === "Explore" ? "button" : Link}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                onClick={
                  label === "Explore" ? handleComingSoon : handleMobileMenuToggle
                }
              >
                {label}
              </MenuItem>
            ))}

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
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleMobileMenuToggle();
                  }}
                  sx={{ color: "red", fontWeight: "bold" }}
                >
                  Logout
                </MenuItem>
              </>
            )}

            {!isLoggedIn && (
              <MenuItem
                component="button"
                onClick={() => {
                  handleComingSoon();
                  handleMobileMenuToggle();
                }}
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
