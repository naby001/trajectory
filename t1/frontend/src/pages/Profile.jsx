import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component

export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to store user information
  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@example.com",
  });

  useEffect(() => {
    // Check if user data is available in location state
    if (location.state?.user) {
      setUser(location.state.user);
      localStorage.setItem("user", JSON.stringify(location.state.user));
    } else {
      // If no state, fetch from localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove user data on logout
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            mt: 10,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "#1e1e1e",
            color: "white",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#90caf9" }}>
            Welcome, {user.name}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: "#f48fb1" }}>
            Email: {user.email}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              backgroundColor: "#f48fb1",
              "&:hover": {
                backgroundColor: "#c2185b",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </>
  );
}
