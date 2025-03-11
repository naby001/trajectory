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
import hydro from "../assets/6.png";
import datamine from "../assets/1.png";
import model from "../assets/13.png";
import clash from "../assets/3.png";
import debate from "../assets/5.png";
import egg from "../assets/10.png";
import frame from "../assets/9.jpg";
import robo from "../assets/7.png";
import qui from "../assets/4.png";
import maze from "../assets/8.jpg";
import Hover from "../assets/20.jpg";


export const events = [
  {
    id: "67b7102b9a01ff3f0a3c85e1",
    title: "HydroBlasters",
    description: "Get ready for an exciting water-based adventure event featuring water jets and aerodynamics. Participants create rockets using bottles, fill them with water, and launch them, demonstrating creativity, physics, and teamwork.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "2-3",
    price: 2000.00,
    image: hydro,
    //prelimsDate: "2023-11-01",
    finalsDate: "19-03-2025",
    coordinators: [
      { name: "Kaulik Das", phone: " 9830669894" },
      { name: "Avipso Sinha", phone: "94332 43651" },
      { name: "Shayan Charan", phone: "91631 23389" } //hih
    ],
    rules: 
    [
      "All teams must strictly adhere to the competition guidelines and design constraints outlined in this event documentation",
      "Any deviation or violation of the rules will result in immediate disqualification.",
      "Teams are expected to maintain professionalism. Any form of misconduct will lead to immediate disqualification.",
      "The Decision of the Event Coordinators will be final and NO Arguments shall be entertained."
      
    ],
    pdfLink: "https://drive.google.com/file/d/1GOzVMhgb9HAqCN0ZGwCVXjcN9jZS70QA/view?usp=sharing"
  },

  {
    id:"67b7148d9a01ff3f0a3c85ec", //id of code sprint
    title: "Data Mine",
    description: "A code-breaking and puzzle-solving event where participants decode encrypted messages, solve cryptic clues, and crack complex challenges. It tests logical thinking, cryptography knowledge, and problem-solving speed",
    location: "Mechanical Dept, Jadavpur University",
    type: "Simulation Challenge",
    groupSize: "2-4",
   // price: 6000.00,
    image: datamine,
    prelimsDate: "17-03-2025 (online mode)",
    finalsDate: "18-03-2025",
    coordinators: [
      { name: "Tuhin Chakraborty", phone: "9038432263" },
      { name: "Rohit Dutta", phone: "9064890591" },
      { name: "Koustav Das",phone:"8348217647"}
    ],
    rules:
     [
      "A participant can join only one team. Multiple registrations will lead to disqualification.",
     " Participants are expected to maintain professional conduct throughout the competition.",
     "Any form of plagiarism, cheating, or unethical behavior will result in immediate disqualification.",
      "The decision of the Event Coordinator will be final and no arguments will be entertained."
    ],
    pdfLink: "https://drive.google.com/file/d/1ES9vS307RdhUQAGo-OOZ9-X_K15W_vq2/view?usp=drive_link"
  },
  {
    id:"67b714449a01ff3f0a3c85e6",
    title: "Model Matrix",
    description: "Gear up to flex your skills in CAD modeling and simulation. Focussed on complex core engineering parts and components, it challenges precision, creativity, and technical expertise in a dynamic and competitive setting."   ,
    location: "Mechanical Dept, Jadavpur University",
    type: "Simulation Challenge",
    groupSize: "1",
    price: 5000.00,
    image: model,
    prelimsDate: "17-03-2025 (online mode)",
    finalsDate: "18-03-2025",
    coordinators: [
      { name: "Debadrita Hazra", phone: "9883311422" },
      { name: "Sourav Paul", phone: "94330 31650" },
      { name: "Koustav Bhattacharjee",phone:"85849 77088"},
      { name: " Soumyojit Biswas",phone:"83890 06855"}
     
    ],
    rules:
     [
      "Every participant should bring a personal laptop on the day of the competition.",
      "Everyone should submit the .sldprt or .f3d and assembly files after the exam.",
      "Teams must strictly adhere to competition guidelines and event constraints outlined in this document.",
     " Participants are expected to maintain professional conduct throughout the competition.",
     "Any form of plagiarism, cheating, or unethical behavior will result in immediate disqualification.",
     "During the offine round, participants must reach the venue on time. Once the clock starts, they will have only the remaining time to complete the task. No extra time will be given. If a player is absent on that day, their opponent will receive a walkover.",
      "The decision of the Event Coordinator will be final and no arguments will be entertained."
    ],
    pdfLink: "https://drive.google.com/file/d/1YWZxyWIP6_x_ofAvv_PD1CGFjeXgOQv7/view?usp=drive_link"
  },
  {
    id: "67b714799a01ff3f0a3c85ea",
    title: "Clash of Cases",
    description: "Use your skills to analyze real-world business scenarios and present innovative solutions to showcase your problem-solving and analytical thinking abilities",
    location: "Mechanical Dept, Jadavpur University",
    type: "General",
    groupSize: "1-4",
      price: 1000.00, // not yet decided
    image: clash,
    prelimsDate: "17-03-2025(online)",
    finalsDate: "18-03-2025",
    coordinators: [
      { name: "Srija Mondal", phone: "8851270470" },
      {name: "Koustav Bhattacharjee", phone: "8584977088" },
      { name: "Nilendu Dikshit", phone: "7797749574" }
    ],
    rules: [
      "The primary task is to redesign and optimize the heat exchanger to maximize heat transfer efficiency while maintaining structural integrity and satisfy other conditions.",
      "Any deviation or violation of the rules will result in immediate disqualification.",
      "Participant is expected to maintain professional conduct throughout the competition.",
       "Any form of plagiarism, cheating, or unethical behavior will result in immediate disqualification.",
      "The decision of the Event Coordinator will be final and no arguments will be entertained."
      
    ],
    pdfLink: "https://drive.google.com/file/d/1eQ4bsbd-ukHU7gcg2FxWmgIfqYVX0xGt/view?usp=drive_link"
  },
  {
     id: "67b7145e9a01ff3f0a3c85e8", //id of debate competition
     title: "Torko Bitorko",
     description: "Be prepared to engage yourself in thought-provoking discussions on general knowledge, core engineering concepts, and current affairs to showcase analytical thinking, argumentation skills and intellectual agility",
     location: "Mechanical Dept, Jadavpur University",
     type: "General",
     groupSize: "1-4",
    // price: 1000.00,
     image: debate,
    // prelimsDate: "17-03-2025",
     finalsDate: "19-03-2025",
     coordinators: [
       { name: "Mrinmay Tarafdar", phone: "9749386827" },
       {name: "Koustav Das", phone: "8348217647" },
       { name: "Aditya Mondal", phone: "974270706" }  
     ],
     rules: [
       "During the preparation period, usage of mobile phones, laptops, or any reference material is strictly prohibited.",
       "Participants must respect their fellow debaters. Interruptions, personal attacks, or aggressive behavior will not be tolerated.",
       "Participants are expected to maintain professional conduct throughout the competition.",
        "Any form of plagiarism, cheating, or unethical behavior will result in immediate disqualification.",
       "The decision of the Event Coordinator will be final and no arguments will be entertained.",
       
     ],
     pdfLink: "https://drive.google.com/file/d/1rXmIVzJE1DdFaVpSf6-nW8eVs_rqUhrp/view?usp=drive_link"
   },
   {
    id: "67b714349a01ff3f0a3c85e5",
    title: "Hoverpod",
    description: "An exciting event where participants build and race hovercraft-like vehicles. These self-propelled pods glide on a cushion of air. Teams focus on design, stability, and speed to compete in time-based challenges",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "5",
    price: 6000.00,
    image: Hover,
    //prelimsDate: "2023-11-05",
    finalsDate: "17-03-2025",
    coordinators: [
      { name: "Suman Kundu", phone: "98019 41637" },
      { name: "Himopravo Chowdhuri", phone: "94759 74209" },
      { name: "Nasim Ahmed Mallick", phone: "80160 53970" },
      { name: "Archit", phone: "90026 84106" }
    ],
    rules: [
      "Points will be given based on the parameters and penalties, following all the specifications mentioned in the document ",
      "Any deviation or violation of the rules will result in immediate disqualification.",
      "Participant is expected to maintain professional conduct throughout the competition.",
       "Any form of plagiarism, cheating, or unethical behavior will result in immediate disqualification.",
      "The decision of the Event Coordinator will be final and no arguments will be entertained.",
    ],
    pdfLink: "https://drive.google.com/file/d/1s9ANyRgxjhtUzYBGttqUFFJChxMj7lM0/view?usp=drive_link"
  },
  {
    id: "67b7141b9a01ff3f0a3c85e4",
    title: "Prot-Egg-t",
    description: "A fun event where participants design protective contraptions to prevent an egg from breaking during a high drop. Teams test creativity and engineering skills by building structures to cushion the egg’s impact.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "2-4",
    price: 2000.00,
    image: egg,
    prelimsDate: "17-03-2025",
    finalsDate: "17-03-2025",
    coordinators: [
      { name: "Samriddha Chakraborty", phone: "9330284935" },
      {name: "Mainak Roy", phone: "7908373925" },
      { name: "Satanik Auddy", phone: "9038514040" }
    ],
    rules: [
      "Necessary materials will be prvided.Scissors and Fevicol only are allowed. Other adhesives like dendrite, Fevi-quick, glue guns are strictly prohibited.",
      "Interdisciplinary teams (members from different courses) and intercollege teams (members from different institutions) are allowed.",
      "Participants are expected to maintain professional conduct throughout the competition.",
       "Any form of plagiarism, cheating, or unethical behavior will result in immediate disqualification.",
      "The decision of the Event Coordinator will be final and no arguments will be entertained.",
      
    ],
    pdfLink: "https://drive.google.com/file/d/1exEWry5G-5XeBCgQv6SRGRlOgV320aAD/view?usp=drive_link"
  },
  {
    id: "67b7146e9a01ff3f0a3c85e9",
    title: "Beyond The Frame",
    description: "Grasp the oppurtunity to capture the world from a unique perspective. This event challenges creativity in storytelling, showcasing extraordinary moments that highlight life’s beauty and intricacies.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Fun Activities",
    groupSize: "1",
    price: 2000.00,
    image: frame,
    prelimsDate: "17-03-2025 & 18-03-2025",
    finalsDate: "19-03-2025",
    coordinators: [
      { name: "Arijit Mandal:", phone: "89107 10278" },
      { name: "Soham Sharma Sarkar", phone: "98369 37267" },
      { name: "Souranshu Roy Chaudhuri", phone: "81005 35494" },
      { name: "Deepayan Roy", phone: "70475 21166" }
    ],
    rules: [
      "Multi-exposure and composite images are allowed, but all components must be photographed by the participant. No stock or third-party images can be used.",
      "Plagiarism, copyright violations, or submission of AI-generated content will lead to immediate disqualification. ",
      "Participants must respect the privacy and dignity of subjects in their photographs,especially in street photography.",
       "Offensive, violent, or politically sensitive imagery may be rejected at the discretion of the organizers.",      
      "The decision of the Event Coordinator will be final and no arguments will be entertained.",
    ],
    pdfLink: "https://drive.google.com/file/d/11rnn8pP9JeGEINmdTDc_B5MyVWi-KSqM/view?usp=drive_link"
  },
  
  {
    id: "67b710919a01ff3f0a3c85e2",
    title: "Robo League",
    description: "Buckle up to build and program robots to play soccer autonomously or via remote control. Teams compete by scoring goals in a fast-paced, strategy-driven match on a mini soccer field.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "2-5",
   price: 6000.00, //not confirmed
    image: robo,
    prelimsDate: "18-03-2025",
    finalsDate: "18-03-2025",
    coordinators: [
      { name: "Arijit Mandal", phone: "89107 10278" },
      { name: "Nabyendu Das", phone: "7003751910" },
      { name: "Nilendu Dikshit", phone: "77977 49574" },
      { name: "Dipayan Mandal", phone: "6289 742 848" }
    ],
    rules: [
      "Each team must build their own robot.",
      "The robot must navigate through the obstacle course.",
      "All designs must adhere to the event guidelines.",
      "Teams must inform organizers in advance if their robot requires specific technical support.",
      "Judges' decisions are final."
    ],
    pdfLink: "https://drive.google.com/file/d/1YDw7s5VcqIFc3Dl7m9gYtxgv78GVvFXa/view?usp=drive_link"
  },
  {
    id: "67b714529a01ff3f0a3c85e7",
    title: "Gyan Yudh",
    description: "Test your knowledge in a variety of subjects in this quiz competition. It challenges intellect, speed, and awareness, offering a thrilling battle of wits for all knowledge enthusiasts.",
    location: "Lecture Hall, Jadavpur University",
    type: "General",
    groupSize: "1-3",
    price: 1000.00,
    image: qui,
    prelimsDate: "18-03-2025",
    finalsDate: "19-03-2025",
    coordinators: [
      { name: "Sayan Das", phone: "+91 7980148375" },
      { name: "Souvik Howlader", phone: "+91 9775430333" },
      { name: "Samrat Roy Choudhury", phone: "+91 9933903605" },
      { name: "Prothoma Dutta", phone: "+91 9163403723" },
      { name: "Sampad Chanda", phone: "+91 9126127847" }
    ],
    rules: [
      "Each team must answer the given questions within the time limit.",
      "All answers must adhere to the event guidelines.",
      "Judges' decisions are final."
    ],
    pdfLink: "https://drive.google.com/file/d/1YkrZC0uLcGNNWWYH17k2VxrGGxdaTKcv/view?usp=drive_link"
  },
  {
    id: "67b710b69a01ff3f0a3c85e3",
    title: "Robotrail",
    description: "Design and construct a line-following robot that navigates a predefined path.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Hardware Challenge",
    groupSize: "3-4",
    price: 6000.00,
    image: maze,
    prelimsDate: "18-03-2025",
    finalsDate: "18-03-2025",
    coordinators: [
      { name: "Rohit Dutta", phone: "" },
      { name: "Antan Shah", phone: "8585050938" },
      { name: "Abhirup Guha Roy", phone: "8910232532" }
    ],
    rules: [
      "Each team must design and build their own line-following robot.",
      "The robot must navigate through the predefined path.",
      "All designs must adhere to the event guidelines.",
      "Teams must inform organizers in advance if their robot requires specific technical support.",
      "Judges' decisions are final."
    ],
    pdfLink: "https://drive.google.com/file/d/1at1zypz0_h0R4pt2UU9ohbSAfCVJLGXt/view?usp=sharing"
  },
  {
    id: "",
    title: "Treasure Hunt",
    description: "An adventurous event where participants solve clues and complete challenges to find hidden treasures. It combines teamwork,problem-solving, and strategy as teams race to finish first and claim victory.",
    location: "Mechanical Dept, Jadavpur University",
    type: "Fun Actvities",
    groupSize: "1",
   // price: 1000.00, // not yet decided
    //image: "https://images.pexels.com/photos/256660/pexels-photo-256660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
   // prelimsDate: "17-03-2025(online)",
    finalsDate: "17-03-2025",
    coordinators: [
      { name: "Himopravo Chowdhuri", phone: "94759 74209" },
      { name: "Mrinmay Tarafdar", phone: "9749386827" },
      { name: "Tuhin Chakraborty", phone: "9038432263" }
    ],
    rules: [
      "Any deviation or violation of the rules will result in immediate disqualification.",
      "Participant is expected to maintain professional conduct throughout the competition.",
       "Any form of plagiarism, cheating, or unethical behavior will result in immediate disqualification.",
      "The decision of the Event Coordinator will be final and no arguments will be entertained."
      
    ],
    pdfLink: "https://example.com/treasurehunt.pdf"
  },
  
  
 
  
];

const unstopLinks = {
  "67b7102b9a01ff3f0a3c85e1": "https://unstop.com/o/mAg4YNs?lb=5D9mviYU&utm_medium=Share&utm_source=shortUrl",
  "67b7148d9a01ff3f0a3c85ec": "https://unstop.com/o/PGkBT7a?lb=5D9mviYU&utm_medium=Share&utm_source=shortUr",
  "67b714449a01ff3f0a3c85e6": "https://unstop.com/o/gBP02F1?lb=5D9mviYU&utm_medium=Share&utm_source=shortUr",
  "67b714799a01ff3f0a3c85ea": "https://unstop.com/o/Zi3vI8n?lb=5D9mviYU&utm_medium=Share&utm_source=shortUrl",
  "67b7145e9a01ff3f0a3c85e8": "https://unstop.com/o/Rzv2xHh?lb=5D9mviYU&utm_medium=Share&utm_source=shortU",
  "67b714349a01ff3f0a3c85e5": "https://unstop.com/o/7dNvB96?lb=5D9mviYU&utm_medium=Share&utm_source=shortUr", // Updated link
  "67b7141b9a01ff3f0a3c85e4": "https://unstop.com/o/r4Vap1c?lb=5D9mviYU&utm_medium=Share&utm_source=shortUr",
  "67b7146e9a01ff3f0a3c85e9": "https://unstop.com/o/1W62PzC?lb=5D9mviYU&utm_medium=Share&utm_source=shortUrl",
  "67b710919a01ff3f0a3c85e2": "https://unstop.com/o/TuF04d6?lb=5D9mviYU&utm_medium=Share&utm_source=shortU",
  "67b714529a01ff3f0a3c85e7": "https://unstop.com/o/TMnrf9G?lb=5D9mviYU&utm_medium=Share&utm_source=shortUr",
  "67b710b69a01ff3f0a3c85e3": "https://unstop.com/o/rDWuaG6?lb=5D9mviYU&utm_medium=Share&utm_source=shortUrl"
};

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
          "https://trajectory-37k0.onrender.com/api/events/registered",
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
        <Typography variant="h4">Coming Soon</Typography>
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
                  height: { xs: 'auto', md: '750px' }, // Set height to auto on mobile
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Box component="img" 
                  src={eventDetails.image}
                  // Added lazy loading
                  sx={{
                    width: '100%',
                    height: 'auto',
                    mb: 2,
                    borderRadius: 2,
                    transition: 'transform 0.3s ease-in-out', // Added transition
                    '&:hover': {
                      transform: 'scale(1.05)', // Scale up on hover
                    },
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
                  onClick={() => window.location.href = unstopLinks[eventId] || 'https://unstop.com/'}
                >
                  <Box
                    component="img"
                    src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/branding-guidelines/icon/unstop-icon-800x800.png" // Replace with the actual URL of the Unstop logo
                    // Added lazy loading
                    sx={{
                      width: '24px',
                      height: '24px',
                      mr: 1,
                      transition: 'transform 0.3s ease-in-out', // Added transition
                      '&:hover': {
                        transform: 'scale(1.2)', // Scale up on hover
                      },
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
                  height: { xs: 'auto', md: '750px' }, // Set height to auto on mobile
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
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
                <Button
                  variant="contained"
                  sx={{ 
                    mt: 2, 
                    backgroundColor: '#0099ff', // Updated button color
                    '&:hover': {
                      backgroundColor: '#F45558',
                    },
                  }}
                  onClick={() => window.open(eventDetails.pdfLink, '_blank')}
                >
                  Statement
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
