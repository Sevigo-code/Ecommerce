import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DevicesIcon from '@mui/icons-material/Devices';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { RootState } from '../store';

const Navbar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <DevicesIcon sx={{ mr: 1, fontSize: 28 }} />
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          TechVibe
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton
            color="inherit"
            component={Link}
            to="/login"
            size="large"
          >
            <PersonOutlineIcon />
          </IconButton>

          <IconButton
            color="inherit"
            component={Link}
            to="/cart"
            size="large"
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
    </AppBar>
  );
};

export default Navbar; 