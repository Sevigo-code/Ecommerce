import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { RootState } from '../store';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { addToCart } from '../store/slices/cartSlice';
import ActionButton from '../components/ActionButton';

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `/images/${imagePath}`;
  };

  const handleRemoveFromFavorites = (productId: number) => {
    const product = favorites.find(item => item.id === productId);
    if (product) {
      dispatch(toggleFavorite(product));
    }
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (favorites.length === 0) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" align="center" color="text.secondary">
          ❤️ Your Favorites List is Empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        My Favorites
      </Typography>

      <Grid container spacing={3}>
        {favorites.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Box
              sx={{
                background: 'white',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.15)',
                },
              }}
            >
              <Box 
                sx={{ 
                  position: 'relative',
                  p: 2,
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '250px',
                }}
              >
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                    target.onerror = null;
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    display: 'flex',
                    gap: 1,
                    zIndex: 2,
                  }}
                >
                  <Tooltip title="Remove from Favorites">
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFromFavorites(product.id)}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(5px)',
                        color: '#f50057',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.8)',
                          color: '#dc004e',
                        },
                      }}
                    >
                      <FavoriteIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Box 
                sx={{ 
                  p: 2,
                  background: 'rgba(220, 220, 220, 0.5)',
                  backdropFilter: 'blur(8px)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  onClick={() => navigate(`/product/${product.id}`)}
                  sx={{
                    cursor: 'pointer',
                    color: 'rgba(0, 0, 0, 0.87)',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {product.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(0, 0, 0, 0.7)',
                    mt: 0.5 
                  }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <ActionButton
                  variant="primary"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  sx={{ mt: 2 }}
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
                </ActionButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites; 