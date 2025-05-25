import { useEffect, useState, useCallback } from 'react';
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

const imageCache = new Map();

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items: products, loading, error, selectedCategory } = useSelector((state: RootState) => state.products);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: number]: boolean}>({});

  const preloadImage = useCallback((imagePath: string, productId: number) => {
    const url = imagePath.startsWith('http') ? imagePath : `/images/${imagePath}`;
    
    // Si la imagen ya está en caché, márquela como cargada
    if (imageCache.has(url)) {
      setImagesLoaded(prev => ({ ...prev, [productId]: true }));
      return;
    }

    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageCache.set(url, true);
      setImagesLoaded(prev => ({ ...prev, [productId]: true }));
    };
    img.onerror = () => {
      imageCache.set(url, false);
      setImagesLoaded(prev => ({ ...prev, [productId]: true }));
    };
  }, []);

  // Precargar todas las imágenes cuando los productos cambian
  useEffect(() => {
    products.forEach(product => {
      preloadImage(product.image, product.id);
    });
  }, [products, preloadImage]);

  // Precargar imágenes de favoritos
  useEffect(() => {
    favorites.forEach(product => {
      preloadImage(product.image, product.id);
    });
  }, [favorites, preloadImage]);

  const getImageUrl = useCallback((imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    const url = `/images/${imagePath}`;
    // Si la imagen falló al cargar anteriormente, usar placeholder
    if (imageCache.get(url) === false) {
      return '/images/placeholder.jpg';
    }
    return url;
  }, []);

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
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(255, 255, 255, 0.9)',
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
                  width: '100%',
                  height: 250,
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 2,
                  flexShrink: 0,
                }}
              >
                {!imagesLoaded[product.id] && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#f5f5f5',
                    }}
                  >
                    <div className="loading-skeleton" />
                  </Box>
                )}
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    opacity: imagesLoaded[product.id] ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                  onLoad={() => {
                    setImagesLoaded(prev => ({
                      ...prev,
                      [product.id]: true
                    }));
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                    imageCache.set(product.image, false);
                    setImagesLoaded(prev => ({
                      ...prev,
                      [product.id]: true
                    }));
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleToggleFavorite(product)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
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
              </Box>

              <Box
                sx={{ 
                  backgroundColor: 'rgba(245, 245, 245, 0.9)',
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    onClick={() => navigate(`/product/${product.id}`)}
                    sx={{
                      cursor: 'pointer',
                      color: 'rgba(0, 0, 0, 0.87)',
                      '&:hover': { color: 'primary.main' },
                      mb: 1,
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ color: 'rgba(0, 0, 0, 0.7)' }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                </Box>
                <ActionButton
                  variant="primary"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  onClick={() => handleAddToCart(product)}
                  sx={{ width: '100%', mt: 2 }}
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
