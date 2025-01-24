import React, { useState } from "react"
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
} from "@mui/material"
import { useNavigate } from "react-router-dom"

// Create a dark theme instance
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
})

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [university, setUniversity] = useState("")
  const [name, setName] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [universityError, setUniversityError] = useState("")
  const [nameError, setNameError] = useState("")
  const navigate=useNavigate();
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return re.test(email)
  }
 

  const handleSubmit = async (event) => {
    event.preventDefault()
   
    // Reset errors
    setEmailError("")
    setPasswordError("")
    setConfirmPasswordError("")
    setUniversityError("")
    setNameError("")

    // Validate email
    if (!email) {
      setEmailError("Email is required")
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format")
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required")
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long")
    }

    // Validate confirm password for sign up
    if (!isLogin && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match")
    }

    // Validate university
    if (!university) {
      setUniversityError("University is required")
    }

    // Validate name for sign up
    if (!isLogin && !name) {
      setNameError("Name is required")
    }
    
    // If there are no errors, you can proceed with login/signup logic here
    if (
      validateEmail(email) &&
      password.length >= 6 &&
      university &&
      (isLogin || (password === confirmPassword && name))
    ) {
      //console.log(email, password, university, name)
     try{
      const body={email:email,password:password,university:university,name:name};
      const respond= await fetch(`http://localhost:5000/api/${isLogin ? "login" : "register"}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
      })
      const data=await respond.json()
      navigate("/",{user:data.user});


     }catch(err){
       console.log(err)
      }

      // Add your login/signup logic here
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            {isLogin ? "Sign in" : "Sign up"}
          </Typography>
          <FormControlLabel
            control={
              <Switch checked={!isLogin} onChange={() => setIsLogin(!isLogin)} name="authMode" color="primary" />
            }
            label={isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
            sx={{ mb: 3 }}
          />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
                helperText={nameError}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="university"
              label="University"
              name="university"
              autoComplete="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              error={!!universityError}
              helperText={universityError}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: 2,
              }}
              disabled={
                !!emailError ||
                !!passwordError ||
                !!universityError ||
                (!isLogin && (!!confirmPasswordError || !!nameError))
              }
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

