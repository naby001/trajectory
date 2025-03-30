import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
      sx={{
        position: "fixed",
        top: "1rem", 
        left: "1rem", 
        right: "1rem", 
        width: "calc(100% - 2rem)", 
        border: "1px solid #F45558",
        borderRadius: "35px",
        padding: "0rem 1rem",
        backdropFilter: "blur(12px)",
        fontSize: "0.875rem",
        lineHeight: "1.5",
        backgroundColor: "transparent",
        boxShadow: "0 0 15px rgba(255, 102, 102, 0.8)",
        zIndex: 1100,
      }}
    >
      
      <Toolbar sx={{ justifyContent: "space-between",}}>
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: isMobile ? 120 : 150,
              height: isMobile ? 50 : 50,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              marginTop: "10px",
            }}
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

        {!isMobile && (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto", gap: "1rem" }}>
            {["Home", "Explore", "About"].map((label, index) => (
              <Button
                key={index}
                component={Link}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                sx={{
                  textDecoration: "none",
                  padding: "0.5rem 0.85rem",
                  color: "#F45558",
                  backgroundColor: "transparent",
                  border: "1px solid #F45558",
                  borderRadius: "32px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  userSelect: "none",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  transition: "all 200ms",
                  "&:hover": {
                    backgroundColor: "#F45558",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    transform: "scale(1.1)",
                    boxShadow: "0 0 8px #ff6666",
                  },
                  "&:active": {
                    backgroundColor: "#b91c1c",
                  },
                }}
              >
                {label}
              </Button>
            ))}

            {/* ✅ Show only if logged in */}
            {isLoggedIn && (
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
            )}

            {/* ✅ Show login button only if NOT logged in */}
            {!isLoggedIn && (
              <Button
                component={Link}
                to="/login"
                sx={{
                  backgroundColor: "#F45558",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  borderRadius: "32px",
                  textDecoration: "none",
                  padding: "0.5rem 0.85rem",
                  marginLeft: "20px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  userSelect: "none",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: "#ff6666",
                    transform: "scale(1.1)",
                    boxShadow: "0 0 15px #ff6666",
                  },
                  "&:active": {
                    backgroundColor: "#b91c1c",
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
                component={Link}
                to={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                onClick={handleMobileMenuToggle}
              >
                {label}
              </MenuItem>
            ))}
            {/* Show only if logged in */}
            {isLoggedIn && (
              <>
                <MenuItem onClick={handleLogout} sx={{ color: "red", fontWeight: "bold" }}>
                  Logout
                </MenuItem>
              </>
            )}
            {!isLoggedIn && (
              <MenuItem
                component={Link}
                to="/login"
                onClick={handleMobileMenuToggle}
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
