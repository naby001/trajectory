import { useState } from "react"
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import backgroundImage from "../assets/cover.jpg"
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
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
  TextField,
} from "@mui/material"
import { MapPin, Calendar, Users } from 'lucide-react'
import Navbar from "./Navbar"

const tours = [
  {
    id: 1,
    title: "CAD Design Challenge",
    description: "Showcase your CAD skills by designing innovative mechanical components.",
    location: "Hall A, Jadavpur University",
    duration: "3 hours",
    groupSize: "1-3",
    price: 150,
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 2,
    title: "Robo Race",
    description: "Build and race your robots on an obstacle-filled track.",
    location: "Central Lawn, Tech Campus",
    duration: "5 hours",
    groupSize: "2-5",
    price: 300,
    image: "https://images.pexels.com/photos/256412/pexels-photo-256412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 3,
    title: "Bridge Building Contest",
    description: "Design and construct a bridge model to withstand maximum load.",
    location: "Workshop Area, Block B",
    duration: "4 hours",
    groupSize: "3-6",
    price: 200,
    image: "https://images.pexels.com/photos/1438515/pexels-photo-1438515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 4,
    title: "Hydraulic Arm Challenge",
    description: "Build a hydraulic arm to complete specified tasks with precision.",
    location: "Lab 3, Mechanical Wing",
    duration: "3 hours",
    groupSize: "1-4",
    price: 250,
    image: "https://images.pexels.com/photos/256660/pexels-photo-256660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 5,
    title: "5-a-Side Football",
    description: "Compete in an intense 5-a-side football tournament.",
    location: "Sports Ground, North Campus",
    duration: "6 hours",
    groupSize: "5-8",
    price: 100,
    image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 6,
    title: "CS:GO Showdown",
    description: "Team up and dominate in a Counter-Strike: Global Offensive tournament.",
    location: "Gaming Arena, Hall C",
    duration: "4 hours",
    groupSize: "5",
    price: 200,
    image: "https://images.pexels.com/photos/4425763/pexels-photo-4425763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 7,
    title: "RC Plane Competition",
    description: "Design and fly your RC plane in a series of challenging tasks.",
    location: "Open Ground, East Campus",
    duration: "8 hours",
    groupSize: "3-6",
    price: 500,
    image: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 8,
    title: "Valorant Tournament",
    description: "Showcase your tactical shooter skills in a high-stakes Valorant competition.",
    location: "eSports Zone, Hall B",
    duration: "5 hours",
    groupSize: "5",
    price: 200,
    image: "https://images.pexels.com/photos/9825980/pexels-photo-9825980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 9,
    title: "Table Tennis Singles",
    description: "Compete for glory in a high-energy table tennis tournament.",
    location: "Recreation Hall, Block F",
    duration: "2 hours",
    groupSize: "1",
    price: 50,
    image: "https://images.pexels.com/photos/210027/pexels-photo-210027.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 10,
    title: "Automobile Assembly Challenge",
    description: "Assemble and troubleshoot a scaled-down automobile model.",
    location: "Automotive Lab, Block E",
    duration: "6 hours",
    groupSize: "3-5",
    price: 450,
    image: "https://images.pexels.com/photos/630839/pexels-photo-630839.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 11,
    title: "Rocket League eSports",
    description: "Compete in the ultimate Rocket League 3v3 tournament.",
    location: "eSports Lounge, Main Block",
    duration: "3 hours",
    groupSize: "3",
    price: 150,
    image: "https://images.pexels.com/photos/1446001/pexels-photo-1446001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 12,
    title: "Cricket Super Over",
    description: "Participate in an exciting 6-ball cricket match.",
    location: "Cricket Ground, South Campus",
    duration: "3 hours",
    groupSize: "6-10",
    price: 100,
    image: "https://images.pexels.com/photos/1594942/pexels-photo-1594942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
];



export function Explore() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDuration, setFilterDuration] = useState("")

  const filteredTours = tours.filter((tour) => {
    return (
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterDuration === "" || tour.duration.includes(filterDuration))
    )
  })

  return (
    <>
     {/* Navbar */}
     <AppBar position="fixed" sx={{ background: "#282a3a" }}>
        <Navbar />
      </AppBar>
    <Box
      sx={{
        px: 4,
        py: 8,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop:"8%"
      }}
    >
     
      <Typography variant="h1" component="h1" gutterBottom>Explore Events</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 8 }}>
        <TextField
          label="Search tours..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { md: '50%' } }}
        />
        <FormControl variant="outlined" sx={{ width: { md: '25%' } }}>
          <InputLabel>Filter by duration</InputLabel>
          <Select
            value={filterDuration}
            onChange={(e) => setFilterDuration(e.target.value)}
            label="Filter by duration"
          >
            <MenuItem value="">All durations</MenuItem>
            <MenuItem value="3 days">3 days</MenuItem>
            <MenuItem value="4 days">4 days</MenuItem>
            <MenuItem value="5 days">5 days</MenuItem>
            <MenuItem value="7 days">7 days</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {filteredTours.map((tour) => (
          <Grid item xs={12} md={6} lg={4} key={tour.id}>
            <Card>
              <CardHeader title={tour.title} />
              <CardMedia
                component="img"
                height="200"
                image={tour.image}
                alt={tour.title}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {tour.description}
                </Typography>
                <Box sx={{ mt: 4, spaceY: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{tour.location}</span>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{tour.duration}</span>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Users className="w-4 h-4 mr-2" />
                    <span>{tour.groupSize} people</span>
                  </Box>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" component="span">${tour.price}</Typography>
                <Button variant="contained" color="primary">Book Now</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  )
}

