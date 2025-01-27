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

  const validateForm = () => {
    let formErrors = {};

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    if (!isLogin && password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    if (!isLogin && !name.trim()) {
      formErrors.name = "Full name is required";
    }

    if (!isLogin && !university.trim()) {
      formErrors.university = "University name is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

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
          setSnackbarMessage("Successfully signed up! Redirecting to profile...");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/profile"), 2000);
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
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
                error={!!errors.name}
                helperText={errors.name}
              />
            )}
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="University"
              fullWidth
              variant="outlined"
              margin="normal"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              error={!!errors.university}
              helperText={errors.university}
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
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
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
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
