import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import Navbar from './Navbar';

export function About() {
  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #0b0c10 30%, #1f2833 90%)', // Gradient background
      minHeight: '100vh',
      py: 8,
      color: 'white', // Set font color to white
    }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ background: "#282a3a" }}>
        <Navbar />
      </AppBar>

      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" sx={{color: '#FFD700', fontWeight: 'bold', mb: 4, textShadow: '2px 2px 4px black' }}>
          Trajectory 2025
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ mb: 2, color: 'white' }}>
              Welcome to **Trajectory 2025**, the premier event for mechanical engineering enthusiasts and professionals! This event is designed to bring together the brightest minds in the field to showcase innovations, share knowledge, and inspire the next generation of engineers.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'white' }}>
              Trajectory 2025 will feature a variety of activities including hands-on workshops, live demonstrations, keynote speeches by industry leaders, and exciting competitions. Whether you're a seasoned engineer or a curious student, there's something for everyone.
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
              Join us in exploring the latest advancements in sustainable engineering, robotics, and manufacturing. Together, let's shape the future of mechanical engineering.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 400, position: 'relative' }}>
              <CardMedia
                component="img"
                image="https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                alt="Mechanical Tech Fest"
                sx={{ height: '100%', objectFit: 'cover', borderRadius: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h3" sx={{ color: '#FFD700', fontWeight: 'bold', mt: 6, mb: 3, textShadow: '2px 2px 4px black' }}>
          Highlights of Trajectory 2025
        </Typography>
        <Grid container spacing={3}>
          {['Innovative Exhibits', 'Global Networking', 'Future-Driven Themes'].map((highlight, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {highlight}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {index === 0 && "Explore groundbreaking projects and prototypes created by the brightest minds in mechanical engineering."}
                    {index === 1 && "Connect with global leaders, experts, and peers to share ideas and expand your professional network."}
                    {index === 2 && "Dive into themes like sustainable design, advanced manufacturing, and AI-driven robotics."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
