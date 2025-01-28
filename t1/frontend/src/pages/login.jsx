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
  InputAdornment,
  IconButton,
  Checkbox,
  Grid,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/trajectory-car.jpg"; // Full-size image
import trajectoryLogo from "../assets/trajectory-logo.png"; // Trajectory logo

// 🎨 3D Gradient Theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#2979FF" },
    secondary: { main: "#FF3D3D" },
    background: {
      default: "linear-gradient(135deg, #0D0D0D, #181818, #232526)",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h4: { fontWeight: 700, color: "#fff", fontSize: "1.8rem" },
  },
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to home page
    }
  }, [navigate]);

  // ✅ Form Validation
  const validateForm = () => {
    let formErrors = {};
    if (!email.trim()) formErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Invalid email address";

    if (!password.trim()) formErrors.password = "Password is required";
    else if (password.length < 6) formErrors.password = "Password must be at least 6 characters long";

    if (!isLogin && password !== confirmPassword) formErrors.confirmPassword = "Passwords do not match";
    if (!isLogin && !name.trim()) formErrors.name = "Full name is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // ✅ Handle Login & Signup
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/${isLogin ? "login" : "register"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // Redirect to home page after login
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
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0D0D0D, #181818, #232526)",
        }}
      >
        <Container component="main" maxWidth="lg">
          <Paper
            elevation={10}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "rgba(30, 30, 30, 0.95)",
              backdropFilter: "blur(10px)",
              width: "90%",
              maxWidth: "1000px",
              height: "80vh",
            }}
          >
            <Grid container>
              {/* Left Side: Form */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  textAlign: "center",
                }}
              >
                <Box sx={{ width: "90%" }}>
                  {/* 🚀 Trajectory Logo */}
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                    <img src={trajectoryLogo} alt="Trajectory Logo" style={{ width: 100 }} />
                  </Box>

                  <Typography variant="h4" sx={{ color: "#FF3D3D" }}>
                    {isLogin ? "Welcome Back, Champion!" : "Join the Revolution!"}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {isLogin
                      ? "Login to take on the next big challenge!"
                      : "Sign up and begin your journey with us!"}
                  </Typography>
                  <FormControlLabel
                    control={<Switch checked={!isLogin} onChange={() => setIsLogin(!isLogin)} />}
                    label={isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
                    sx={{ mt: 1 }}
                  />
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
                    {!isLogin && (
                      <TextField label="Full Name" fullWidth variant="outlined" size="small" margin="normal" value={name} onChange={(e) => setName(e.target.value)} error={!!errors.name} helperText={errors.name} />
                    )}
                    <TextField label="Email Address" fullWidth variant="outlined" size="small" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
                    <TextField label="Password" fullWidth type={showPassword ? "text" : "password"} variant="outlined" size="small" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password} InputProps={{ endAdornment: (<InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>), }} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, py: 1 }}>{loading ? "Processing..." : isLogin ? "Begin Your Trajectory!" : "Sign Up"}</Button>
                    <Button fullWidth variant="outlined" sx={{ mt: 2, py: 1 }} startIcon={<GoogleIcon />}>Sign in with Google</Button>
                  </Box>
                </Box>
              </Grid>

              {/* Right Side: Image */}
              <Grid item xs={12} md={6} sx={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: "100%" }} />
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
