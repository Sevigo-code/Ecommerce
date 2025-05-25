import { Box, Container } from '@mui/material';

const Footer = () => {
  const scrollText = "FREE SHIPPING ON ALL YOUR PURCHASES";
  // Repetir el texto varias veces para asegurar una animación continua
  const repeatedText = Array(6).fill(scrollText).join(' ');

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'black',
        color: 'white',
        py: 0.5,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1000
      }}
    >
      <Container maxWidth={false} disableGutters>
        <div className="scroll-container">
          <div className="scroll-text">
            {Array(2).fill(repeatedText).map((text, index) => (
              <span key={index} className="scroll-text-content">
                {text}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Footer; 