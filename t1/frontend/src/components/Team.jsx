import { Card, CardContent, Typography, Fade, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./MeetOurTeam.css";

const teamMembers = [
    {
        name: "Koustav Das",
        role: "Event Coordinator",
        image: "https://picsum.photos/130/130?image=1027",
        linkedin: "https://linkedin.com/in/johndoe",
        email: "mailto:johndoe@example.com",
    },
    {
        name: "Koustav Das",
        role: "Marketing Lead",
        image: "https://picsum.photos/130/130?image=839",
        linkedin: "https://linkedin.com/in/janesmith",
        email: "mailto:janesmith@example.com",
    },
    {
        name: "Koustav Das",
        role: "Event Coordinator",
        image: "https://picsum.photos/130/130?image=1027",
        linkedin: "https://linkedin.com/in/johndoe",
        email: "mailto:johndoe@example.com",
    },
    {
        name: "Koustav Das",
        role: "Marketing Lead",
        image: "https://picsum.photos/130/130?image=839",
        linkedin: "https://linkedin.com/in/janesmith",
        email: "mailto:janesmith@example.com",
    },

    {
        name: "Koustav Das",
        role: "Marketing Lead",
        image: "https://picsum.photos/130/130?image=839",
        linkedin: "https://linkedin.com/in/janesmith",
        email: "mailto:janesmith@example.com",
    },
];

const MeetOurTeam = () => {
    return (
        <div>
            <Typography
                variant="h4"
                align="center"
                className="michroma"
                sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "rgb(187, 83, 84)",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
            >
                Meet Our Team
            </Typography>
            <Box display="flex" justifyContent="center">
                <Box className="container">
                    {teamMembers.map((member, index) => (
                        <Fade in={true} timeout={1000} key={index}>
                            <Card className="our-team">
                                <Box className="picture">
                                    <img src={member.image} alt={member.name} className="img-fluid" />
                                </Box>
                                <CardContent className="team-content">
                                    <Typography variant="h6" className="name">
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2" className="title">
                                        {member.role}
                                    </Typography>
                                    <Box className="social">
                                        <a href={member.email} target="_blank" rel="noopener noreferrer">
                                            <EmailIcon />
                                        </a>
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                            <LinkedInIcon />
                                        </a>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Fade>
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default MeetOurTeam;
