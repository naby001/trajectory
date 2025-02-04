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
}));

const mapPoints = [
  { name: "Start", position: 0 },
  { name: "Point A", position: 25 },
  { name: "Point B", position: 50 },
  { name: "Point C", position: 75 },
  { name: "End", position: 100 },
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

  return (
    <RoadmapContainer>
      <Road />
      <Car style={{ top: `${carPosition}%` }} />
      {mapPoints.map((point, index) => (
        <MapPoint key={index} style={{ top: `calc(${point.position}% - 40px)` }}>
          <Typography variant="body2" align="center">
            {point.name}
          </Typography>
        </MapPoint>
      ))}
    </RoadmapContainer>
  );
}
