import React from 'react';
import { Box, Typography, styled, keyframes } from '@mui/material';

// Keyframes for the loop animation
const loopAnimation = keyframes`0%{transform: translateX(0);}100%{transform: translateX(-50%);}`;

// Styled components
const AppContainer = styled(Box)({
  fontFamily: "'Poppins', sans-serif",
  backgroundColor: '#1C1B1F',
  color: '#FFFFFF',
  minWidth: '100vw',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const TagList = styled(Box)({
  width: '30rem',
  maxWidth: '90vw',
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
  padding: '0.7rem 1rem',
  marginRight: '1rem',
  boxShadow:
    '0 0.1rem 0.2rem rgb(0 0 0 / 20%), 0 0.1rem 0.5rem rgb(0 0 0 / 30%), 0 0.2rem 1.5rem rgb(0 0 0 / 40%)',
  '& span': {
    fontSize: '1.2rem',
    color: '#1C1B1F',
  },
});

const Fade = styled(Box)({
  pointerEvents: 'none',
  background: 'linear-gradient(90deg, #1C1B1F, transparent 30%, transparent 70%, #1C1B1F)',
  position: 'absolute',
  inset: 0,
});

// Data for tags
const tags = [
  ['JavaScript', 'webdev', 'Typescript', 'Next.js', 'UI/UX'],
  ['webdev', 'Gatsby', 'JavaScript', 'Tailwind', 'Typescript'],
  ['animation', 'Tailwind', 'React', 'SVG', 'HTML'],
  ['Gatsby', 'HTML', 'CSS', 'React', 'Next.js'],
  ['Next.js', 'React', 'webdev', 'Typescript', 'Gatsby'],
];

const InfiniteScrollAnimation = () => {
  return (
    <AppContainer>
      <TagList>
        {tags.map((tagGroup, index) => (
          <LoopSlider
            key={index}
            duration={`${Math.floor(Math.random() * 20000) + 10000}ms`}
            direction={index % 2 === 0 ? 'normal' : 'reverse'}
          >
            <Box className="inner">
              {[...tagGroup, ...tagGroup].map((tag, i) => (
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