import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  Switch,
  FormControlLabel,
  CssBaseline,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#121212", paper: "#1e1e1e" },
  },
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/${isLogin ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, university, name }),
      });
      const data = await response.json();
      if (response.ok) {
        if (!isLogin) {
          setSnackbarMessage("Successfully signed up! Redirecting to login...");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/login"), 2000);
        } else {
          localStorage.setItem("token", data.token);
          navigate("/profile", { state: { user: data.user } });
        }
      } else {
        setErrors({ general: data.msg || "Something went wrong" });
      }
    } catch (error) {
      setErrors({ general: "Failed to connect to server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2, textAlign: "center" }}>
          <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            {isLogin ? "Sign In" : "Sign Up"}
          </Typography>
          <FormControlLabel
            control={<Switch checked={!isLogin} onChange={() => setIsLogin(!isLogin)} />}
            label={isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
            sx={{ mb: 3 }}
          />
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            {!isLogin && (
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="University"
              fullWidth
              variant="outlined"
              margin="normal"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <TextField
                label="Confirm Password"
                fullWidth
                type="password"
                variant="outlined"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            {errors.general && <Typography color="error">{errors.general}</Typography>}
            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3 }}>
              {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </Box>
        </Paper>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
