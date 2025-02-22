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

const events = [
  {
    id: "67b7102b9a01ff3f0a3c85e1", // ✅ Ensure IDs match explore.jsx
    title: "HydroBlasters",
    description: "Showcase your CAD skills by designing innovative mechanical components.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "1-3",
    price: 1000.00,
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b710919a01ff3f0a3c85e2",
    title: "Robo League",
    description: "Build and race your robots on an obstacle-filled track.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "2-5",
    price: 6000.00,
    image: "https://images.pexels.com/photos/256412/pexels-photo-256412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b710b69a01ff3f0a3c85e3",
    title: "Mazecraft",
    description: "Design and construct a line-following robot that navigates a predefined path.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "3-6",
    price: 6000.00,
    image: "https://images.pexels.com/photos/1438515/pexels-photo-1438515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b7141b9a01ff3f0a3c85e4",
    title: "Prot-Egg-t",
    description: "Build a hydraulic arm to complete specified tasks with precision.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "1-4",
    price: 1000.00,
    image: "https://images.pexels.com/photos/256660/pexels-photo-256660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b714349a01ff3f0a3c85e5",
    title: "Hoverpod",
    description: "Compete in an intense 5-a-side football tournament.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "5",
    price: 6000.00,
    image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b714449a01ff3f0a3c85e6",
    title: "Model Matrix",
    description: "Design innovative mechanical components using Solidworks or Fusion software.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Simulation Challenge",
    groupSize: "5",
    price: 1000.00,
    image: "https://images.pexels.com/photos/4425763/pexels-photo-4425763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b714529a01ff3f0a3c85e7",
    title: "Gyaan Yudh",
    description: "Test your knowledge in a challenging quiz competition.",
    location: "Mechanical Dept, Jadavpur University",
    type: "General",
    groupSize: "General",
    price: 1000.00,
    image: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b7145e9a01ff3f0a3c85e8",
    title: "Tarka Bitarka",
    description: "Engage in a lively debate on important topics with fellow participants.",
    location: "Mechanical Dept, Jadavpur University",
    type: "General",
    groupSize: "5",
    price: 1000.00,
    image: "https://images.pexels.com/photos/9825980/pexels-photo-9825980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b7146e9a01ff3f0a3c85e9",
    title: "Beyond The Frame",
    description: "Compete in a fast-paced mixed doubles badminton tournament.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Sports Challenge",
    groupSize: "1",
    price: 1000.00,
    image: "https://images.pexels.com/photos/210027/pexels-photo-210027.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b714799a01ff3f0a3c85ea",
    title: "Clash of Cases",
    description: "Compete in a traditional tug of war competition with your team.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Sports Challenge",
    groupSize: "3-5",
    price: 1000.00,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMpWZh3RDT7SttEtt1yebbB2tnpHMeQ8BqqA&s",
  },
  {
    id: "67b7148d9a01ff3f0a3c85ec",
    title: "Data Mine",
    description: "Participate in a thrilling cricket match, showcasing your skills.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Sports Challenge",
    groupSize: "3",
    price: 1000.00,
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: "67b714ad9a01ff3f0a3c85ed",
    title: "Football",
    description: "Participate in an exciting football match with your team.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Sports Challenge",
    groupSize: "6-10",
    price: 1000.00,
    image: "https://cdn.magicdecor.in/com/2024/05/22173454/Football-Abstract-Design-Wallpaper-Mural-710x488.jpg",
  },
  {
    id: "67b714b79a01ff3f0a3c85ee",
    title: "Treasure Hunt",
    description: "Embark on a treasure hunt across the campus, solving clues and finding hidden treasures.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Fun Activities",
    groupSize: "6-10",
    price: 1000.00,
    image: "https://www.wanderquest.in/monthly-subscription-boxes-for-kids-6-to-12-years/modules//smartblog/images/15-single-default.jpg",
  },
  {
    id: "67b714d09a01ff3f0a3c85ef",
    title: "Mystery Event",
    description: "",
    location: "Mechanical Dept, Jadavpur University",
    type: "Mystery Event?",
    groupSize: "6-10",
    price: 1000.00,
    image: "https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

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
                  }}
                  fullWidth
                  onClick={() => window.location.href = 'https://unstop.com/'}
                >
                  Registration Open
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
                      secondary={<Typography color="gray">TBD</Typography>}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <EventIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography color="white">Event Date (Finals)</Typography>}
                      secondary={<Typography color="gray">TBD</Typography>}
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
                          <Typography color="gray">Rupankur Mondol: 7439454364</Typography>
                          <Typography color="gray">Subranuj Poddar: 8617322403</Typography>
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
                  {[
                    'Each team must design and build their own hovercraft.',
                    'The hovercraft must be able to navigate through the designated course.',
                    'All designs must be safe and adhere to the event guidelines.',
                    'Teams must inform organizers in advance if their hovercraft requires specific technical support.',
                    'Judges\' decisions are final.',
                  ].map((rule, index) => (
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