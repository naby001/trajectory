import React from 'react';
import { Box, styled, keyframes } from '@mui/material';

// Keyframes for the loop animation
const loopAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

// Keyframes for the fade-in and fade-out animation
const fadeInOut = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

// Styled components
const AppContainer = styled(Box)({
  fontFamily: "'Poppins', sans-serif",
  backgroundColor: '#1C1B1F',
  color: '#FFFFFF',
  width: '100vw', // Adjusted to fit the whole screen
  height: '100vh', // Adjusted to fit the whole screen
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const TagList = styled(Box)({
  width: '100%', // Adjusted to fit the whole screen
  maxWidth: '100vw', // Adjusted to fit the whole screen
  display: 'flex',
  flexShrink: 0,
  flexDirection: 'column',
  gap: '1rem 0',
  position: 'relative',
  padding: '1.5rem 0',
  overflow: 'hidden',
});

const LoopSlider = styled(Box)(({ duration, direction }) => ({
  '& .inner': {
    display: 'flex',
    width: 'fit-content',
    animationName: loopAnimation,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: direction,
    animationDuration: duration,
    whiteSpace: 'nowrap', // Ensure all tags stay in one line
  },
}));

const Tag = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0 0.2rem',
  color: '#FFFFFF',
  fontSize: '0.9rem',
  backgroundColor: '#F45558',
  borderRadius: '0.4rem',
  padding: '0.7rem 1.5rem', // Adjusted padding for better spacing
  marginRight: '1rem',
  boxShadow:
    '0 0.1rem 0.2rem rgb(0 0 0 / 20%), 0 0.1rem 0.5rem rgb(0 0 0 / 30%), 0 0.2rem 1.5rem rgb(0 0 0 / 40%)',
  '& span': {
    fontSize: '1.2rem',
    color: '#1C1B1F',
  },
  whiteSpace: 'nowrap', // Prevent text from wrapping
});

const Fade = styled(Box)({
  pointerEvents: 'none',
  background: 'linear-gradient(90deg, #1C1B1F, transparent 30%, transparent 70%, #1C1B1F)',
  position: 'absolute',
  inset: 0,
  animation: `${fadeInOut} 3s infinite`, // Add animation
});

// Data for tags
const tags = [
  ['Thermal Engineering', 'Fluid Mechanics', 'Machine Design', 'Heat Transfer', 'Control Systems'],
  ['Power Electronics', 'Structural Analysis', 'Digital Circuits', 'Data Structures', 'Signal Processing'],
  ['Manufacturing Processes', 'Software Engineering', 'Embedded Systems', 'Artificial Intelligence', 'Numerical Methods'],
  ['Fluid Mechanics', 'Machine Design', 'Heat Transfer', 'Control Systems', 'Power Electronics'],
  ['Structural Analysis', 'Digital Circuits', 'Data Structures', 'Signal Processing', 'Manufacturing Processes'],
];

const InfiniteScrollAnimation = () => {
  return (
    <AppContainer>
      <TagList>
        {tags.map((tagGroup, index) => (
          <LoopSlider
            key={index}
            duration={`${Math.floor(Math.random() * 600000) + 300000}ms`} // Slower speed (30s to 90s)
            direction={index % 2 === 0 ? 'normal' : 'reverse'}
          >
            <Box className="inner">
              {Array(100) // Duplicate content 100 times
                .fill([...tagGroup])
                .flat()
                .map((tag, i) => (
                  <Tag key={i}>
                    <span>#</span> {tag}
                  </Tag>
                ))}
            </Box>
          </LoopSlider>
        ))}
        <Fade />
      </TagList>
    </AppContainer>
  );
};

export default InfiniteScrollAnimation;