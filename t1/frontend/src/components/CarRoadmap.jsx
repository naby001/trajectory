import { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const RoadmapContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "600px", // Adjust the height of the roadmap
  overflow: "visible", // Ensure the road is fully displayed
  zIndex: 1, // Fix the z-index of the roadmap
  backgroundColor: "black", // Change background color to black
  [theme.breakpoints.down("sm")]: {
    height: "450px", // Adjust the height for small screens
  },
  [theme.breakpoints.down("xs")]: {
    height: "100vh", // Make it full screen for extra small screens
  },
}));

const Road = styled("div")({
  position: "absolute",
  left: "50%",
  top: 0,
  width: "4px",
  height: "100%",
  backgroundColor: "#333",
  zIndex: 2, // Ensure the road is above other elements
});

const Car = styled(DirectionsCarIcon)(({ theme }) => ({
  position: "absolute",
  left: "calc(50% - 12px)",
  top: 0,
  color: theme.palette.primary.main,
  fontSize: "24px", // Fix the size of the car component
  transition: "top 0.5s ease-in-out",
  zIndex: 3, // Ensure the car is above the road
  animation: "glow 1s infinite alternate",
  "@keyframes glow": {
    from: {
      boxShadow: `0 0 5px ${theme.palette.primary.main}`,
    },
    to: {
      boxShadow: `0 0 20px ${theme.palette.primary.main}`,
    },
  },
}));

const MapPoint = styled(Paper)(({ theme }) => ({
  position: "absolute",
  left: "calc(50% - 40px)",
  width: "80px",
  height: "80px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  zIndex: 4, // Ensure the map points are above the road
  "&:hover + div": {
    boxShadow: `0 0 30px ${theme.palette.primary.main}`, // Increase glow spread
    transform: "scale(1.05)", // Add zoom-in animation
  },
}));

const EventDetailsBox = styled(Paper)(({ theme, side }) => ({
  position: "absolute",
  left: side === "left" ? "calc(50% - 250px)" : "calc(50% + 50px)",
  width: "200px",
  padding: theme.spacing(2),
  marginTop: theme.spacing(4), // Increase spacing between point and details
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  zIndex: 5, // Ensure the event details box is above other elements
  transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out, opacity 0.5s ease-in-out",
  opacity: 0,
  "&:hover": {
    boxShadow: `0 0 30px ${theme.palette.primary.main}`, // Increase glow spread
    transform: "scale(1.05)", // Add zoom-in animation
  },
  "&.fade-in": {
    opacity: 1,
  },
  [theme.breakpoints.down("sm")]: {
    left: side === "left" ? "calc(50% - 200px)" : "calc(50% + 20px)",
    width: "180px",
  },
  [theme.breakpoints.down("xs")]: {
    left: "50%",
    transform: "translateX(-50%)",
    width: "70%", // Reduce width to 70% for extra small screens
    boxSizing: "border-box", // Ensure padding is included in width calculation
  },
}));

const mapPoints = [
  { name: "Day 1", position: 0, details: "Event details for Day 1" },
  { name: "Day 2", position: 25, details: "Event details for Day 2" },
  { name: "Day 3", position: 50, details: "Event details for Day 3" },
  { name: "Day 4", position: 75, details: "Event details for Day 4" },
  { name: "Day 5", position: 100, details: "Event details for Day 5" },
];

export default function CarRoadmap() {
  const [carPosition, setCarPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarPosition((prevPosition) => {
        if (prevPosition >= 100) {
          return 0;
        }
        return prevPosition + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".event-details-box");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          element.classList.add("fade-in");
        } else {
          element.classList.remove("fade-in");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <RoadmapContainer>
      <Road />
      <Car style={{ top: `${carPosition}%` }} />
      {mapPoints.map((point, index) => (
        <div key={index}>
          <MapPoint style={{ top: `calc(${point.position}% - 40px)` }}>
            <Typography variant="body2" align="center">
              {point.name}
            </Typography>
          </MapPoint>
          <EventDetailsBox
            className="event-details-box"
            side={index % 2 === 0 ? "left" : "right"}
            style={{ top: `calc(${point.position}% - 40px)` }}
          >
            <Typography variant="body2">
              {point.details}
            </Typography>
          </EventDetailsBox>
        </div>
      ))}
    </RoadmapContainer>
  );
}
