import { Card, CardContent, Typography, Fade, Box, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./MeetOurTeam.css";

const teamMembers = [
    {
        name: "Nabyendu Das",
        role: "Tech Lead",
        image: "https://res.cloudinary.com/dz4ooxird/image/upload/f_auto,q_auto/v1/my/nc8nkkhw46lins64niuz",
        linkedin: "https://www.linkedin.com/in/nabyendu-das-596b45266/",
        email: "nabyendutukai.das@gmail.com",
    },
    
    {
        name: "Maurya Samanta",
        role: "Software Developer",
        image: "https://res.cloudinary.com/df9fz5s3o/image/upload/f_auto,q_auto/erlc1tzjzd8fdvljnwqv",
        linkedin: "https://linkedin.com/in/janesmith",
        email: "mailto:janesmith@example.com",
    },
   
    {
        name: "Debdutta Naskar",
        role: "Backend Developer",
        image: "https://media-hosting.imagekit.io//bb323ed2704642ed/IMG_20250311_090325.webp?Expires=1836284985&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WUMFef6DDz3K~8VNYiyCTMyTeC90Q75KTsRY8zIKHsqdUm319KQNVl7Cl19gHKJlh18NeCiefQv3Ld4odczctLID1EEV-R6iEQbR9Dg9MWbRosr-W5zAcoUpmTLpc00cIhDfm3SOAEo~XDGIFlMrUHL5gCMKiybeRP5Vwn2h6mHHvIgkocLQ22IWU9tsAZbh~b214qzVcFwOdIv0nQdGMp4QcRlGDV2MAjqZgYDl0quwQFvhpFNq~-FuiaiYL6gH0CPJYnAEmgf9QhASiX0qtpCjwT~7cWS5LKZsaSMLzwRj20uYSNUg0gqyQFuJNnlqewwHkisvxZRUhc8L2EmgHg__",
        linkedin: "https://www.linkedin.com/in/debdutta-naskar-66b3bb213/?trk=opento_sprofile_details",
        email: "debduttanaskar777@gmail.com",
    },

    {
        name: "Koustav Das",
        role: "UI/UX Designer",
        image: "https://picsum.photos/130/130?image=839",
        linkedin: "https://linkedin.com/in/janesmith",
        email: "mailto:janesmith@example.com",
    },
];

const MeetOurTeam = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Grid container spacing={4} justifyContent="center">
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Fade in={true} timeout={1000}>
                            <Card className="our-team">
                                <Box className="picture">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="img-fluid" 
                                        style={{ width: "130px", height: "130px", objectFit: "cover", borderRadius: "50%" }} 
                                    />
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
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MeetOurTeam;
