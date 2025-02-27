import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Container,
} from '@mui/material';
import {
  Event as EventIcon,
  Group as GroupIcon,
  EmojiEvents as PrizeIcon,
  Info as InfoIcon,
  Gavel as RulesIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { events } from './events'; // Import events from a separate file

export default function Details() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("event");
  const [eventDetails, setEventDetails] = useState(null);
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    console.log("Event ID from URL:", eventId); // Debugging statement
    const event = events.find(e => e.id.toString() === eventId); // ✅ Compare as strings
    console.log("Event details found:", event); // Debugging statement
    setEventDetails(event);
  }, [eventId]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:5000/api/events/registered",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setRegisteredEvents(data.map((event) => event._id));
      } catch (error) {
        console.error("❌ Error fetching registered events:", error);
      }
    };

    fetchRegisteredEvents();
  }, []);

  const handleRegisterClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      navigate('/login');
    } else {
      navigate(`/teamregistration?event=${eventId}&name=${eventDetails.title}`);
    }
  };

  if (!eventDetails) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: '#1C1B1F', // Removed background gradient
          color: '#FFFFFF', // Updated text color
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Poppins', // Updated font family
        }}
      >
        <Typography variant="h4">Comming Soon</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          background: '#1C1B1F', // Removed background gradient
          color: '#FFFFFF', // Updated text color
          py: 4,
          pt: 12,
          fontFamily: 'Poppins', // Updated font family
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Header */}
            <Grid item xs={12} textAlign="center">
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  mb: 1, 
                  background: 'linear-gradient(90deg, yellow, white)', // Gradient text color
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {eventDetails.title}
              </Typography>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  background: '#1C1B1F', // Removed transparency
                  boxShadow: '0 0 10px 2px #F45558', // Added glow effect
                }}
              >
                <Box component="img" 
                  src={eventDetails.image}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    mb: 2,
                    borderRadius: 2,
                  }}
                />
                
                <Button
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    backgroundColor: '#0099ff', // Updated button color
                    '&:hover': {
                      backgroundColor: '#F45558',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  fullWidth
                  onClick={() => window.location.href = 'https://unstop.com/'
                  }
                >
                  <Box
                    component="img"
                    src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/branding-guidelines/icon/unstop-icon-800x800.png" // Replace with the actual URL of the Unstop logo
                    sx={{
                      width: '24px',
                      height: '24px',
                      mr: 1,
                    }}
                  />
                  Register on Unstop
                </Button>
                <Typography variant="body1" sx={{ mt: 2, color: '#FFFFFF', textAlign: 'center' }}>
                  OR 
                </Typography>
                <Button
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    backgroundColor: '#0099ff', // Updated button color
                    '&:hover': {
                      backgroundColor: '#F45558',
                    },
                  }}
                  fullWidth
                  onClick={handleRegisterClick}
                >
                 Quick Register
                </Button>
              </Paper>
            </Grid>
            

            {/* Event Details */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  background: '#1C1B1F', // Removed transparency
                  boxShadow: '0 0 10px 2px #F45558', // Added glow effect
                }}
              >
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EventIcon sx={{ color: '#FFFFFF' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="#FFFFFF">Event Date (Prelims)</Typography>}
                      secondary={<Typography color="gray">{eventDetails.prelimsDate}</Typography>}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <EventIcon sx={{ color: '#FFFFFF' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="#FFFFFF">Event Date (Finals)</Typography>}
                      secondary={<Typography color="gray">{eventDetails.finalsDate}</Typography>}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <GroupIcon sx={{ color: '#FFFFFF' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="#FFFFFF">Team Size</Typography>}
                      secondary={<Typography color="gray">{eventDetails.groupSize} members</Typography>}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon sx={{ color: '#FFFFFF' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="#FFFFFF">Event Coordinators</Typography>}
                      secondary={
                        <Box>
                          {eventDetails.coordinators.map((coordinator, index) => (
                            <Typography key={index} color="gray">{`${coordinator.name}: ${coordinator.phone}`}</Typography>
                          ))}
                        </Box>
                      }
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <PrizeIcon sx={{ color: '#FFFFFF' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="#FFFFFF">Prize</Typography>}
                      secondary={<Typography color="gray">Exciting Prizes for the winners.</Typography>}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon sx={{ color: '#FFFFFF' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="#FFFFFF">Event Description</Typography>}
                      secondary={
                        <Typography color="gray">
                          {eventDetails.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Rules Section */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  background: '#1C1B1F', // Removed transparency
                  boxShadow: '0 0 10px 2px #F45558', // Added glow effect
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, color: '#FFFFFF' }}>
                  <RulesIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#FFFFFF' }} />
                  Event Rules
                </Typography>
                <List>
                  {eventDetails.rules.map((rule, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={<Typography color="#FFFFFF">{`${index + 1}. ${rule}`}</Typography>}
                        sx={{ color: 'gray' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
