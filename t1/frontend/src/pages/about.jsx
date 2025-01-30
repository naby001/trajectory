import React, { useEffect, useRef } from 'react';

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
  const sectionRef = useRef(null);
  const gridItemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    gridItemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      gridItemRefs.current.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        background: 'linear-gradient(135deg, #0b0c10 30%, #1f2833 90%)', // Gradient background
        minHeight: '100vh',
        py: 8,
        color: 'white', // Set font color to white
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        '&.animate': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      }}
    >
      {/* Navbar */}
      <AppBar position="fixed" sx={{ background: "#282a3a" }}>
        <Navbar />
      </AppBar>

      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" sx={{ fontFamily: 'Lobster, Arial', color: '#FFD700', fontWeight: 'bold', mb: 4, textShadow: '2px 2px 4px black' ,pt:3 }}>
          Trajectory 2025
        </Typography>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={6}
            ref={(el) => (gridItemRefs.current[0] = el)}
            sx={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              '&.animate': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, color: 'white', fontFamily: 'Open Sans, Arial' }}>
              Welcome to **Trajectory 2025**, the premier event for mechanical engineering enthusiasts and professionals! This event is designed to bring together the brightest minds in the field to showcase innovations, share knowledge, and inspire the next generation of engineers.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: 'white', fontFamily: 'Open Sans, Arial' }}>
              Trajectory 2025 will feature a variety of activities including hands-on workshops, live demonstrations, keynote speeches by industry leaders, and exciting competitions. Whether you're a seasoned engineer or a curious student, there's something for everyone.
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Open Sans, Arial' }}>
              Join us in exploring the latest advancements in sustainable engineering, robotics, and manufacturing. Together, let's shape the future of mechanical engineering.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            ref={(el) => (gridItemRefs.current[1] = el)}
            sx={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              '&.animate': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            }}
          >
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
        <Typography variant="h3" sx={{ fontFamily: 'Lobster, Arial', color: '#FFD700', fontWeight: 'bold', mt: 6, mb: 3, textShadow: '2px 2px 4px black' }}>
          Highlights of Trajectory 2025
        </Typography>
        <Grid container spacing={3}>
          {['Innovative Exhibits', 'Global Networking', 'Future-Driven Themes'].map((highlight, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              ref={(el) => (gridItemRefs.current[index + 2] = el)}
              sx={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                '&.animate': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom sx={{ fontFamily: 'Lobster, Arial' }}>
                    {highlight}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Open Sans, Arial' }}>
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
