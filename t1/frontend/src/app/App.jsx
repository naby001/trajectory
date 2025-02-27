import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "../pages/Homepage";
import {Explore} from "../pages/explore";
import {About} from "../pages/about";
import Details from "../pages/details";
import AuthPage from "../pages/login";
import TeamRegistration from "../pages/TeamRegistration";
// import InviteTeamMembers from "./pages/InviteTeamMembers";
import Invites from "../pages/Invites"; // ✅ Added Invites Page
// import SplashCursor from "../components/SplashCursor"; // ✅ Remove SplashCursor component

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
  typography: {
    h1: { fontSize: "3rem", "@media (min-width:600px)": { fontSize: "4.5rem" } },
    h2: { fontSize: "2.5rem", "@media (min-width:600px)": { fontSize: "3.75rem" } },
    h3: { fontSize: "2rem", "@media (min-width:600px)": { fontSize: "3rem" } },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* <Navbar /> ✅ Add Navbar so it updates dynamically */}
        {/* <SplashCursor /> ✅ Remove SplashCursor component */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/details" element={<Details />} />

          {/* ✅ Team Routes - Will show in Navbar if logged in */}
          <Route path="/TeamRegistration" element={<TeamRegistration />} />
          <Route path="/invites" element={<Invites />} />
          
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
