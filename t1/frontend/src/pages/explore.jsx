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


// Mock data for tours
const tours = [
  {
    id: 1,
    title: "Golden Triangle Tour",
    description: "Explore the famous Golden Triangle of India",
    location: "Delhi, Agra, Jaipur",
    duration: "5 days",
    groupSize: "10-15",
    price: 499,
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 2,
    title: "Kerala Backwaters",
    description: "Experience the serene backwaters of Kerala",
    location: "Alleppey, Kerala",
    duration: "4 days",
    groupSize: "8-12",
    price: 599,
    image: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 3,
    title: "Rajasthan Desert Safari",
    description: "Discover the majestic deserts of Rajasthan",
    location: "Jaisalmer, Rajasthan",
    duration: "6 days",
    groupSize: "12-18",
    price: 799,
    image: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 4,
    title: "Goa Beach Holiday",
    description: "Relax on the beautiful beaches of Goa",
    location: "Goa, India",
    duration: "5 days",
    groupSize: "6-10",
    price: 699,
    image: "https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 5,
    title: "Himalayan Trek",
    description: "Trek through the stunning Himalayas",
    location: "Manali, Himachal Pradesh",
    duration: "7 days",
    groupSize: "10-15",
    price: 999,
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 6,
    title: "Andaman Islands",
    description: "Explore the pristine beaches of Andaman",
    location: "Andaman and Nicobar Islands",
    duration: "6 days",
    groupSize: "8-12",
    price: 899,
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
]

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
    <Box
      sx={{
        px: 4,
        py: 8,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>Explore Tours</Typography>
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
  )
}

