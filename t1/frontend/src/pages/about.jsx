import React from 'react'
import coverImage from "../assets/cover.jpg";
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
} from "@mui/material"

export function About() {
  return (
    <Box sx={{
      backgroundImage: `url(${coverImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      py: 8,
      
    }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" sx={{color: '#FFD700', fontWeight: 'bold', mb: 4, textShadow: '2px 2px 4px black' }}>
          About Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Welcome to TourPlanner, your ultimate companion in crafting unforgettable journeys. We are passionate about
              transforming your travel dreams into reality, one adventure at a time.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Founded in 2023, TourPlanner has quickly become a trusted name in the travel industry. Our team of
              experienced travel enthusiasts is dedicated to providing personalized, seamless, and enriching travel
              experiences for our clients.
            </Typography>
            <Typography variant="body1">
              Whether you're seeking a relaxing beach getaway, an adrenaline-pumping adventure, or a cultural immersion,
              we're here to make it happen. Let us take care of the details while you focus on creating lasting memories.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 400, position: 'relative' }}>
              <CardMedia
                component="img"
                image="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600?height=400&width=600"
                alt="TourPlanner Team"
                sx={{ height: '100%', objectFit: 'cover', borderRadius: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h3" sx={{ color: '#FFD700', fontWeight: 'bold', mt: 6, mb: 3, textShadow: '2px 2px 4px black' }}>
          Our Values
        </Typography>
        <Grid container spacing={3}>
          {['Customer-Centric', 'Sustainability', 'Innovation'].map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {index === 0 && "We put our customers first, tailoring each journey to meet their unique preferences and needs."}
                    {index === 1 && "We are committed to promoting responsible travel and minimizing our environmental impact."}
                    {index === 2 && "We continuously strive to improve our services and embrace new technologies to enhance your travel experience."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

