import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar, Toolbar, Typography, Badge, IconButton, Box, Container
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DevicesIcon from '@mui/icons-material/Devices';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { RootState } from '../store';

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)', 
        color: 'black' 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={1}>
            <DevicesIcon sx={{ fontSize: 30, color: 'primary.main' }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                fontSize: '1.4rem',
                color: 'primary.main',
                textDecoration: 'none',
                letterSpacing: '-0.5px',
              }}
            >
              TechVibe
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            <IconButton
              component={Link}
              to="/login"
              size="large"
              sx={{
                color: 'text.primary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              <PersonOutlineIcon />
            </IconButton>

            <IconButton
              component={Link}
              to="/cart"
              size="large"
              sx={{
                color: 'text.primary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              <Badge
                badgeContent={cartItems.length}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.75rem',
                    height: '20px',
                    minWidth: '20px',
                  }
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
