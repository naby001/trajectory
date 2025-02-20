'use client'

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
  Chip,
} from '@mui/material'
import {
  Event as EventIcon,
  Group as GroupIcon,
  EmojiEvents as PrizeIcon,
  Info as InfoIcon,
  Gavel as RulesIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material'
import Navbar from './Navbar' // Import Navbar component

export default function Details() {
  return (
    <>
      <Navbar /> {/* Include Navbar component */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'black', // Background color is black
          color: 'white',
          py: 4,
          pt: 12, // Increase top padding
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Header */}
            <Grid item xs={12} textAlign="center">
              <Typography variant="h2" component="h1" sx={{ mb: 1, color: 'white' }}>
                Hover<span style={{ color: '#4A9DFF' }}>pod</span>
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
                  src="https://cdn.magicdecor.in/com/2024/05/22173454/Football-Abstract-Design-Wallpaper-Mural-710x488.jpg"
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
                    backgroundColor: '#4A9DFF', // Ensure button color is blue
                    '&:hover': {
                      backgroundColor: '#00008B', // Darker blue on hover
                    },
                  }}
                  fullWidth
                  disabled
                >
                  Registration closed
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
                      secondary={<Typography color="gray">1-4 members</Typography>}
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
                          <Typography color="gray">Rounak Mukherjee: 7439454364</Typography>
                          <Typography color="gray">Saptarshi Koley: 8617322403</Typography>
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
                          Hoverpod is an exhilarating event where participants design and race their own hovercrafts. Teams will navigate through a challenging course, showcasing their engineering skills and creativity. The event promises thrilling competition and innovative designs. Get ready to hover!
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
  )
}

