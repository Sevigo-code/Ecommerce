import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
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
        <Typography 
          variant="body2" 
          sx={{
            textAlign: 'center',
            fontSize: '0.875rem',
            letterSpacing: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
          className="scroll-text"
        >
          FREE SHIPPING ON ALL YOUR PURCHASES &nbsp;&nbsp;&nbsp; FREE SHIPPING ON ALL YOUR PURCHASES &nbsp;&nbsp;&nbsp; FREE SHIPPING ON ALL YOUR PURCHASES
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 