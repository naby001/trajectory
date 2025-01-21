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
    title: "Water Rocket",
    description: "Showcase your CAD skills by designing innovative mechanical components.",
    location: "Hall A, Jadavpur University",
    duration: "Hardware Challenge",
    groupSize: "1-3",
    price: 150,
    image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 2,
    title: "Robo Soccer",
    description: "Build and race your robots on an obstacle-filled track.",
    location: "Central Lawn, Tech Campus",
    duration: "Hardware Challenge",
    groupSize: "2-5",
    price: 300,
    image: "https://images.pexels.com/photos/256412/pexels-photo-256412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 3,
    title: "Line Follower",
    description: "Design and construct a line-following robot that navigates a predefined path.",
    location: "Workshop Area, Block B",
    duration: "Hardware Challenge",
    groupSize: "3-6",
    price: 200,
    image: "https://images.pexels.com/photos/1438515/pexels-photo-1438515.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 4,
    title: "Egglosion",
    description: "Build a hydraulic arm to complete specified tasks with precision.",
    location: "Lab 3, Mechanical Wing",
    duration: "Hardware Challenge",
    groupSize: "1-4",
    price: 250,
    image: "https://images.pexels.com/photos/256660/pexels-photo-256660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 5,
    title: "HoverPod",
    description: "Compete in an intense 5-a-side football tournament.",
    location: "Sports Ground, North Campus",
    duration: "6 hours",
    groupSize: "Hardware Challenge",
    price: 100,
    image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 6,
    title: "Solidworks/Fusion",
    description: "Design innovative mechanical components using Solidworks or Fusion software.",
    location: "Gaming Arena, Hall C",
    duration: "Simulation Challenge",
    groupSize: "5",
    price: 200,
    image: "https://images.pexels.com/photos/4425763/pexels-photo-4425763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 7,
    title: "Quiz",
    description: "Test your knowledge in a challenging quiz competition.",
    location: "Open Ground, East Campus",
    duration: "8 hours",
    groupSize: "General",
    price: 500,
    image: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 8,
    title: "Debate",
    description: "Engage in a lively debate on important topics with fellow participants.",
    location: "eSports Zone, Hall B",
    duration: "General",
    groupSize: "5",
    price: 200,
    image: "https://images.pexels.com/photos/9825980/pexels-photo-9825980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 9,
    title: "Badminton(Mixed)",
    description: "Compete in a fast-paced mixed doubles badminton tournament.",
    location: "Recreation Hall, Block F",
    duration: "Sports Challenge",
    groupSize: "1",
    price: 50,
    image: "https://images.pexels.com/photos/210027/pexels-photo-210027.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 10,
    title: "Tug of War",
    description: "Compete in a traditional tug of war competition with your team.",
    location: "Automotive Lab, Block E",
    duration: "Sports Challenge",
    groupSize: "3-5",
    price: 450,
    image: "https://images.pexels.com/photos/630839/pexels-photo-630839.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 11,
    title: "Cricket",
    description: "Participate in a thrilling cricket match, showcasing your skills.",
    location: "eSports Lounge, Main Block",
    duration: "Sports Challenge",
    groupSize: "3",
    price: 150,
    image: "https://images.pexels.com/photos/1446001/pexels-photo-1446001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 12,
    title: "Football",
    description: "Participate in an exciting football match with your team.",
    location: "Cricket Ground, South Campus",
    duration: "Sports Challenge",
    groupSize: "6-10",
    price: 100,
    image: "https://images.pexels.com/photos/1594942/pexels-photo-1594942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 13,
    title: "Treasure Hunt",
    description: "Embark on a treasure hunt across the campus, solving clues and finding hidden treasures.",
    location: "Campus Grounds",
    duration: "Fun Activities",
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
            <MenuItem value="">All events</MenuItem>
            <MenuItem value="Hardware Challenge">Hardware Challenge</MenuItem>
            <MenuItem value="Simulation Challenge">Simulation Challenge</MenuItem>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Sports Challenge">Sports Challenge</MenuItem>
            <MenuItem value="Fun Activities">Fun Activities</MenuItem>
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

