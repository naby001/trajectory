// login.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Button,
  Container,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  FormControlLabel,
  CssBaseline,
  Paper,
  Snackbar,
  Alert,
  Grid,
  Checkbox,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, Link, useLocation } from "react-router-dom";
import log from "../assets/log.png";
import logo from "../assets/logo.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Navbar from "./Navbar";
import Squares from '../components/Square'; // Import Squares component

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#F45558" },
    secondary: { main: "#FFFFFF" },
    background: {
      default: "linear-gradient(to bottom, #000000, #434343)",
      paper: "rgba(28, 27, 31, 0.8)",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const departments = [
  "Computer Science",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Economics",
];

const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("User");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json"
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Fetched Universities:", data);
  
        // Extract only university names and remove duplicates
        const universityNames = [...new Set(data.map((uni) => uni.name))];
  
        setUniversities(universityNames);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };
  
    fetchUniversities();
  }, []);
  
  

  // State fields for authentication
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [universityYear, setUniversityYear] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateUserData = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser.name || "User");
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserName("User");
        }
      } else {
        setUserName("User");
      }
    };

    updateUserData();

    // Listen for storage changes
    window.addEventListener("storage", updateUserData);
    return () => window.removeEventListener("storage", updateUserData);
  }, [location]);

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

    if (!isLogin && !university) {
      formErrors.university = "University is required";
    }

    if (!isLogin && !department) {
      formErrors.department = "Department is required";
    }

    if (!isLogin && !universityYear) {
      formErrors.universityYear = "University year is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const endpoint = isLogin ? "login" : "register";
      const payload = isLogin
        ? { email, password }
        : { email, password, name, university, department, universityYear };
      const response = await fetch(
        `https://trajectory-37k0.onrender.com/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        if (!isLogin) {
          setSnackbarMessage("Successfully signed up! Logging in...");
          setOpenSnackbar(true);
          if (data.user) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.dispatchEvent(new Event("storage"));
            setTimeout(() => navigate("/"), 1500);
          } else {
            setErrors({
              general: "Signup successful but user data is missing.",
            });
          }
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUserName(data.user.name);
          setIsLoggedIn(true);
          window.dispatchEvent(new Event("storage"));
          navigate("/", { state: { user: data.user } });
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

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Navbar */}
      <AppBar position="fixed" sx={{ background: "#282a3a" }}>
        <Navbar />
      </AppBar>
      <Box
        sx={{
          background: "linear-gradient(to bottom, #000000, #434343)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: { xs: 10, md: 14 },
          pb: { xs: 2, md: 10 },
          position: "relative", // Add relative positioning
          zIndex: 1, // Ensure content is above the background
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
          <Squares 
            speed={0.5} 
            squareSize={40}
            direction='diagonal' // up, down, left, right, diagonal
            borderColor='#fff'
            hoverFillColor='#222'
          />
        </div>
        <Container component="main" maxWidth="lg" sx={{ zIndex: 10, position: "relative", padding: "20px", overflow: "hidden" }}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 2,
              backdropFilter: "blur(10px)", // Add blur effect
              backgroundColor: "rgba(28, 27, 31, 0.5)", // Make background more transparent
              boxShadow: "0 0 20px #F45558",
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  sx={{
                    width: { xs: "70%", md: "50%" },
                    height: "auto",
                    display: "block",
                    margin: "0 auto 20px",
                  }}
                  alt="Logo"
                  src={logo}
                />
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "2px solid #F45558",
                    boxShadow: "0 0 10px #F45558",
                    display: { xs: "block", md: "none" },
                    mb: 3,
                  }}
                  alt="Login illustration"
                  src={log}
                />
                <Typography
                  component="h2"
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    mb: 3,
                    color: "#F45558",
                    fontWeight: "bold",
                  }}
                >
                  {isLogin ? "Welcome back Champions!" : "Join the Champions!"}
                </Typography>
                <Typography
                  component="h5"
                  variant="body2"
                  sx={{ textAlign: "center", mb: 3 }}
                >
                  {isLogin
                    ? "Login to take up the next big challenge"
                    : "Sign up to take up the next big challenge"}
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ width: "100%" }}
                >
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
                  {!isLogin && (
                    <Autocomplete
                    options={universities}
                    getOptionLabel={(option) => option}
                    filterOptions={(options, { inputValue }) =>
                      options.filter((option) =>
                        option.toLowerCase().includes(inputValue.toLowerCase())
                      ).slice(0, 10) // Limit to 10 results for better UX
                    }
                    value={university}
                    onChange={(event, newValue) => setUniversity(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="University"
                        variant="outlined"
                        margin="normal"
                        error={!!errors.university}
                        helperText={errors.university}
                      />
                    )}
                  />
                  
                  
                  
                  )}
                  {!isLogin && (
                    <TextField
                      label="Department"
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      error={!!errors.department}
                      helperText={errors.department}
                    >
                      {departments.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  {!isLogin && (
                    <TextField
                      label="University Year"
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      value={universityYear}
                      onChange={(e) => setUniversityYear(e.target.value)}
                      error={!!errors.universityYear}
                      helperText={errors.universityYear}
                    >
                      {yearOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  <TextField
                    label="Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {!isLogin && (
                    <TextField
                      label="Confirm Password"
                      fullWidth
                      type={showConfirmPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle confirm password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  {errors.general && (
                    <Typography color="error">{errors.general}</Typography>
                  )}
                  {isLogin && (
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Remember me"
                      sx={{ mt: 2 }}
                    />
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 3, backgroundColor: "#F45558", color: "#FFFFFF" }}
                  >
                    {loading
                      ? "Processing..."
                      : isLogin
                      ? "Sign In"
                      : "Sign Up"}
                  </Button>
                </Box>
                <Typography sx={{ mt: 2, textAlign: "center" }}>
                  {isLogin ? (
                    <span
                      onClick={() => setIsLogin(false)}
                      style={{ color: "#F45558", cursor: "pointer" }}
                    >
                      Need an account? Sign up
                    </span>
                  ) : (
                    <span
                      onClick={() => setIsLogin(true)}
                      style={{ color: "#F45558", cursor: "pointer" }}
                    >
                      Already have an account? Log in
                    </span>
                  )}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "2px solid #F45558",
                    boxShadow: "0 0 10px #F45558",
                  }}
                  alt="Login illustration"
                  src={log}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
