import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { AppDispatch, RootState } from '../store';
import { fetchProducts, setSelectedCategory } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { Product } from '../types';
import ActionButton from '../components/ActionButton';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items: products, loading, error, selectedCategory } = useSelector((state: RootState) => state.products);
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    dispatch(fetchProducts())
      .unwrap()
      .catch((error) => console.error('Error fetching products:', error));
  }, [dispatch]);

  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const handleCategoryChange = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleToggleFavorite = (product: Product) => {
    dispatch(toggleFavorite(product));
  };

  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `/images/${imagePath}`;
  };

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <Grid item key={skeleton} xs={12} sm={6} md={4}>
              <Box
                sx={{
                  height: 300,
                  bgcolor: '#f0f0f0',
                  borderRadius: 2,
                  animation: 'pulse 1.5s infinite ease-in-out',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
        <ActionButton variant="primary" onClick={() => dispatch(fetchProducts())}>
          Retry
        </ActionButton>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }} className="fade-in">
      <FormControl 
        fullWidth 
        size="small" 
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.6) !important',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.8) !important',
            }
          }
        }}
      >
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory || ''}
          onChange={(e) => handleCategoryChange(e.target.value || null)}
          label="Category"
        >
          <MenuItem value="">All categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {products.length === 0 && !loading && !error && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
          There are no products available
        </Alert>
      )}

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
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
                  <Tooltip title={isFavorite(product.id) ? "Remove from Favorites" : "Add to Favorites"}>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleFavorite(product)}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(5px)',
                        color: isFavorite(product.id) ? '#f50057' : 'inherit',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.8)',
                          color: isFavorite(product.id) ? '#dc004e' : '#f50057',
                        },
                      }}
                    >
                      {isFavorite(product.id) ? (
                        <FavoriteIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                      )}
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

export default Home;
