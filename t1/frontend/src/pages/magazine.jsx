import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const tours = [
  { id: 1, title: 'Golden Triangle', description: 'Explore Delhi, Agra, and Jaipur', image: 'https://images.pexels.com/photos/417321/pexels-photo-417321.jpeg' },
  { id: 2, title: 'Kerala Backwaters', description: 'Experience the serene backwaters of Kerala', image: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg' },
  { id: 3, title: 'Rajasthan Heritage', description: 'Discover the royal heritage of Rajasthan', image: 'https://images.pexels.com/photos/417334/pexels-photo-417334.jpeg' },
  { id: 4, title: 'Goa Beaches', description: 'Relax on the beautiful beaches of Goa', image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg' },
];


const FeaturedTour = () => (
  <Paper 
    elevation={0}
    sx={{
      position: 'relative',
      backgroundColor: 'grey.800',
      color: '#fff',
      mb: 4,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('https://images.pexels.com/photos/417321/pexels-photo-417321.jpeg')`,
      height: '400px',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      }}
    />
    <Box
      sx={{
        position: 'relative',
        p: { xs: 3, md: 6 },
        pr: { md: 0 },
      }}
    >
      <Typography component="h1" variant="h3" color="inherit" gutterBottom>
        Discover Amazing Group Tours in India
      </Typography>
      <Typography variant="h5" color="inherit" paragraph>
        Experience unforgettable adventures across India with your friends and family.
      </Typography>
      <Button variant="contained" color="primary">
        Explore Featured Tours
      </Button>
    </Box>
  </Paper>
);

const TourGrid = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      Popular Group Tours in India
    </Typography>
    <Grid container spacing={4}>
      {tours.map((tour) => (
        <Grid item key={tour.id} xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="200"
              image={tour.image}
              alt={tour.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {tour.title}
              </Typography>
              <Typography>
                {tour.description}
              </Typography>
            </CardContent>
            <Button size="small" color="primary" sx={{ m: 2 }}>
              Learn More
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default function GroupTourMagazine() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        
        <FeaturedTour />
        <TourGrid />
      </React.Fragment>
    </ThemeProvider>
  );
}

