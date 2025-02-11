// use client

import { Box, Typography, Paper } from "@mui/material"
import { styled } from "@mui/material/styles"
import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'

const events = [
  {
    title: "Day 1",
    date: "March 17, 2024",
    description:
      "Sports day! Get ready for a day of fun and games, and meet your fellow participants.",
    align: "right",
  },
  {
    title: "Day 2",
    date: "March 18, 2024",
    description: "hARtware workshop! Learn how to build your own AR/VR hardware from scratch.",
    align: "left",
  },
  {
    title: "Day 3",
    date: "March 19, 2024",
    description:
      "Software workshop! Learn how to develop AR/VR applications using the latest tools and technologies.",
    align: "right",
  },
  {
    title: "Final Night",
    date: "March 19, 2024",
    description: "Closing ceremony and awards presentation. Celebrate your achievements with your team!",
    align: "left",
  },
]

const TimelineContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "2px",
    background: "linear-gradient(180deg, #8B5CF6 0%, #3B82F6 100%)",
    top: 0,
    bottom: 0,
    left: "50%",
    marginLeft: "-1px",
    [theme.breakpoints.down('sm')]: {
      left: "90%",
    },
  },
}))
const TimelineItem = styled(Paper)(({ theme }) => ({
  padding: "20px",
  position: "relative",
  width: "45%",
  marginBottom: "60px",
  background: "rgba(30, 30, 30, 0.9)",
  border: "1px solid rgba(139, 92, 246, 0.3)",
  borderRadius: "8px",
  boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)",
  opacity: 0,
  transform: 'translateY(50px)',
  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: "16px",
    height: "16px",
    right: "-45px",
    backgroundColor: "#8B5CF6",
    border: "4px solid rgba(139, 92, 246, 0.3)",
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: "50%",
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      left: "auto",
      right: "-8px",
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    marginLeft: 0,
  },
}))

const LeftTimelineItem = styled(TimelineItem)(({ theme }) => ({
  marginLeft: "auto",
  "&::after": {
    right: "auto",
    left: "-45px",
    [theme.breakpoints.down('sm')]: {
      left: "auto",
      right: "-8px",
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}))

export default function EventTimeline() {
  const [scrolled, setScrolled] = useState(false);
  const timelineRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      timelineRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            ref.classList.add('visible');
          } else {
            ref.classList.remove('visible');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        bgcolor:  "#000",
        minHeight: "100vh",
        color: "white",
        py: 8,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          textAlign: "center",
          mb: 6,
          background: "linear-gradient(90deg, #8B5CF6 0%, #3B82F6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
        }}
      >
        Event Timeline
      </Typography>

      <TimelineContainer>
        {events.map((event, index) => {
          const TimelineItemComponent = event.align === "left" ? LeftTimelineItem : TimelineItem

          return (
            <TimelineItemComponent
              key={index}
              elevation={0}
              ref={el => timelineRefs.current[index] = el}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  color: "#8B5CF6",
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                {event.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#9CA3AF",
                  mb: 2,
                }}
              >
                {event.date}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#D1D5DB",
                }}
              >
                {event.description}
              </Typography>
            </TimelineItemComponent>
          )
        })}
      </TimelineContainer>
    </Box>
  )
}

EventTimeline.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'right']),
    })
  ),
}

