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

export default function Details() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #001524 0%, #003049 100%)',
        color: 'white',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Header */}
          <Grid item xs={12} textAlign="center">
            <Typography variant="h2" component="h1" sx={{ mb: 1 }}>
              2 Minutes to <span style={{ color: '#4A9DFF' }}>Frame</span>
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nw4TQyqwA2dtlhGL3gBDa4FU5bm2Sf.png"
                sx={{
                  width: '100%',
                  height: 'auto',
                  mb: 2,
                  borderRadius: 2,
                }}
              />
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled
                sx={{ mt: 2 }}
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
                    primary="Event Date (Prelims)"
                    secondary={<Typography color="gray">TBD</Typography>}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <EventIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Event Date (Finals)"
                    secondary={<Typography color="gray">TBD</Typography>}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <GroupIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Team Size"
                    secondary={<Typography color="gray">1-4 members</Typography>}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Event Coordinators"
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
                    primary="Prize"
                    secondary={<Typography color="gray">Exciting Prizes for the winners.</Typography>}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <InfoIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Event Description"
                    secondary={
                      <Typography color="gray">
                        Welcome to the vibrant stage of our talent extravaganza! Here, performers have a strict 2-minute window to showcase their skills, be it solo or in groups. Creativity knows no bounds, but remember, all acts must steer clear of offensive content. Planning something technically intricate? Just give us a heads-up! And remember, judges' rulings are the last word. Let the show begin!
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
              <Typography variant="h5" sx={{ mb: 2 }}>
                <RulesIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Event Rules
              </Typography>
              <List>
                {[
                  'Each participant has a strict time limit of 2 minutes for their performance, exceeding which will draw penalties.',
                  'Performances can be single or in group.',
                  'All performances should be free from offensive or inappropriate content.',
                  'Participants must inform organizers in advance if their performance requires specific technical requirements, which will be provided if available.',
                  'Judges\' decisions are final.',
                ].map((rule, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={`${index + 1}. ${rule}`}
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
  )
}

