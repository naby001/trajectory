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
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { events } from './events'; // Import events from a separate file

export default function Details() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("event");
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    console.log("Event ID from URL:", eventId); // Debugging statement
    const event = events.find(e => e.id.toString() === eventId); // ✅ Compare as strings
    console.log("Event details found:", event); // Debugging statement
    setEventDetails(event);
  }, [eventId]);

  if (!eventDetails) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'black',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Event not found</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'black',
          color: 'white',
          py: 4,
          pt: 12,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Header */}
            <Grid item xs={12} textAlign="center">
              <Typography variant="h2" component="h1" sx={{ mb: 1, color: 'white' }}>
                {eventDetails.title}
              </Typography>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
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
                    backgroundColor: '#4A9DFF',
                    '&:hover': {
                      backgroundColor: '#00008B',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  fullWidth
                  onClick={() => window.location.href = 'https://unstop.com/'}
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
                <Typography variant="body1" sx={{ mt: 2, color: 'white', textAlign: 'center' }}>
                  OR 
                </Typography>
                <Button
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    backgroundColor: '#4A9DFF',
                    '&:hover': {
                      backgroundColor: '#00008B',
                    },
                  }}
                  fullWidth
                  onClick={() => window.location.href = '/teamregistration'}
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EventIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="white">Event Date (Prelims)</Typography>}
                      secondary={<Typography color="gray">{eventDetails.prelimsDate}</Typography>}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <EventIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="white">Event Date (Finals)</Typography>}
                      secondary={<Typography color="gray">{eventDetails.finalsDate}</Typography>}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <GroupIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="white">Team Size</Typography>}
                      secondary={<Typography color="gray">{eventDetails.groupSize} members</Typography>}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="white">Event Coordinators</Typography>}
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
                      <PrizeIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="white">Prize</Typography>}
                      secondary={<Typography color="gray">Exciting Prizes for the winners.</Typography>}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="white">Event Description</Typography>}
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>
                  <RulesIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'white' }} />
                  Event Rules
                </Typography>
                <List>
                  {eventDetails.rules.map((rule, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={<Typography color="white">{`${index + 1}. ${rule}`}</Typography>}
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
