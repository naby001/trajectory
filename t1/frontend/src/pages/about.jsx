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
import DecryptedText from '../components/decry';
import Squares from '../components/Square'; // Import Squares component

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
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');`}
        {`@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');`}
        {`.exo-2-regular { font-family: "Exo 2", serif; font-optical-sizing: auto; font-weight: 400; font-style: normal; }`}
        {`.exo-2-bold { font-family: "Exo 2", serif; font-optical-sizing: auto; font-weight: 700; font-style: normal; }`}
        {`.michroma { font-family: "Michroma", sans-serif; }`}
      </style>
      
      <Box
        ref={sectionRef}
        sx={{
          background: 'linear-gradient(90deg, #1C1B1F 0%, rgb(81, 44, 44) 50%, #1C1B1F 100%)', // Updated gradient background
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
          position: "relative", // Add relative positioning
          zIndex: 1, // Ensure content is above the background
        }}
      >
        {/* Navbar */}
        <AppBar position="fixed" sx={{ background: "#282a3a" }}>
          <Navbar />
        </AppBar>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor='#fff'
          hoverFillColor='#222'
        />
      </div>
         <Box  sx={{ zIndex:10, position: "relative", padding: "20px", overflow: "hidden"  }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="michroma" sx={{ color: '#FFD700', mb: 4, textShadow: '10px 10px 4px black, 0 0 10px black', pt: 3, fontWeight: 'bold' }}>
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
              <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, mb: 2, boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
                <Typography variant="body1" className="exo-2-regular" sx={{ color: 'black' }}>
                  <DecryptedText text="Welcome to Trajectory 2025, the premier event for mechanical engineering enthusiasts and professionals! This event is designed to bring together the brightest minds in the field to showcase innovations, share knowledge, and inspire the next generation of engineers." />
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, mb: 2, boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
                <Typography variant="body1" className="exo-2-regular" sx={{ color: 'black' }}>
                  <DecryptedText text="Trajectory 2025 will feature a variety of activities including hands-on workshops, live demonstrations, keynote speeches by industry leaders, and exciting competitions. Whether you're a seasoned engineer or a curious student, there's something for everyone." />
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 2, boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
                <Typography variant="body1" className="exo-2-regular" sx={{ color: 'black' }}>
                  <DecryptedText text="Join us in exploring the latest advancements in sustainable engineering, robotics, and manufacturing. Together, let's shape the future of mechanical engineering." />
                </Typography>
              </Box>
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
          <Typography variant="h3" className="michroma" sx={{ color: '#FFD700', mt: 6, mb: 3, textShadow: '10px 10px 8px black', fontWeight: 'bold' }}>
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
                <Card sx={{ height: '100%',boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
                  <CardContent>
                    <Typography variant="h5" component="div" className="michroma" gutterBottom sx={{  fontWeight: 'bold'  }}>
                      {highlight}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="exo-2-regular">
                      {index === 0 && <DecryptedText text="Explore groundbreaking projects and prototypes created by the brightest minds in mechanical engineering." />}
                      {index === 1 && <DecryptedText text="Connect with global leaders, experts, and peers to share ideas and expand your professional network." />}
                      {index === 2 && <DecryptedText text="Dive into themes like sustainable design, advanced manufacturing, and AI-driven robotics." />}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </Box>
      </Box>
    </>
  );
}
