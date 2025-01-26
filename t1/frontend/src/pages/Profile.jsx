import React from "react";
import { Container, Typography, Paper, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || { name: "Guest", email: "guest@example.com" };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Email: {user.email}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
}
