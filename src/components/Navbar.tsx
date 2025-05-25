import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import DevicesIcon from '@mui/icons-material/Devices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RootState } from '../store';
import { useState, useEffect } from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const token = localStorage.getItem('token');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/login');
  };

  return (
    <>
      <AppBar 
        position="fixed"
        sx={{ 
          bgcolor: isScrolled ? 'transparent' : 'black',
          color: 'white',
          boxShadow: 'none',
          borderBottom: isScrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          transition: 'all 0.3s ease-in-out',
          background: isScrolled ? 'rgba(0, 0, 0, 0.5)' : 'black',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DevicesIcon sx={{ 
                fontSize: 38, 
                color: 'white',
                opacity: isScrolled ? 0.9 : 1,
                transition: 'opacity 0.3s ease-in-out'
              }} />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  textDecoration: 'none',
                  color: 'white',
                  letterSpacing: '-0.5px',
                  fontSize: '1.75rem',
                  fontFamily: "'Helvetica Neue', sans-serif",
                  opacity: isScrolled ? 0.9 : 1,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              >
                TechVibe
              </Typography>
            </Box>

            {/* Iconos derecha */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton 
                color="inherit" 
                size="large"
                sx={{ 
                  opacity: isScrolled ? 0.9 : 1,
                  '&:hover': { 
                    color: 'rgba(255, 255, 255, 0.7)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.2s ease'
                  } 
                }}
              >
                <SearchIcon sx={{ fontSize: '1.5rem' }} />
              </IconButton>

              {token ? (
                <>
                  <IconButton
                    color="inherit"
                    onClick={handleMenuClick}
                    size="large"
                    sx={{ 
                      opacity: isScrolled ? 0.9 : 1,
                      '&:hover': { 
                        color: 'rgba(255, 255, 255, 0.7)',
                        transform: 'scale(1.05)',
                        transition: 'all 0.2s ease'
                      } 
                    }}
                  >
                    <PersonOutlineIcon sx={{ fontSize: '1.5rem' }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        borderRadius: 2,
                        bgcolor: 'rgba(0, 0, 0, 0.9)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        '& .MuiMenuItem-root:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }
                    }}
                  >
                    <MenuItem 
                      onClick={handleLogout}
                      sx={{ 
                        py: 1.5,
                        px: 3,
                        fontWeight: 500,
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/login"
                  size="large"
                  sx={{ 
                    opacity: isScrolled ? 0.9 : 1,
                    '&:hover': { 
                      color: 'rgba(255, 255, 255, 0.7)',
                      transform: 'scale(1.05)',
                      transition: 'all 0.2s ease'
                    } 
                  }}
                >
                  <PersonOutlineIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
              )}

              <IconButton
                color="inherit"
                component={Link}
                to="/favorites"
                size="large"
                sx={{ 
                  position: 'relative',
                  opacity: isScrolled ? 0.9 : 1,
                  '&:hover': { 
                    color: 'rgba(255, 255, 255, 0.7)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.2s ease'
                  } 
                }}
              >
                <Badge
                  badgeContent={favorites.length}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#fff',
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                      minWidth: '18px',
                      height: '18px'
                    }
                  }}
                >
                  <FavoriteIcon sx={{ fontSize: '1.5rem' }} />
                </Badge>
              </IconButton>

              <IconButton
                color="inherit"
                component={Link}
                to="/cart"
                size="large"
                sx={{ 
                  position: 'relative',
                  opacity: isScrolled ? 0.9 : 1,
                  '&:hover': { 
                    color: 'rgba(255, 255, 255, 0.7)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.2s ease'
                  } 
                }}
              >
                <Badge
                  badgeContent={cartItemCount}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#fff',
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                      minWidth: '18px',
                      height: '18px'
                    }
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Spacer para compensar el AppBar fixed */}
      <Toolbar sx={{ mb: 2 }} />
    </>
  );
};

export default Navbar;
