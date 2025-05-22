import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
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
import { AppDispatch, RootState } from '../store';
import { fetchProducts, setSelectedCategory } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items: products, loading, error, selectedCategory } = useSelector((state: RootState) => state.products);

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

  if (loading) {
    return (
      <Container>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <Grid item key={skeleton} xs={12} sm={6} md={4}>
              <div className="loading-skeleton"></div>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => dispatch(fetchProducts())}
        >
          Retry Loading Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      {products.length === 0 && !loading && !error && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
          No products available
        </Alert>
      )}

      <FormControl fullWidth size="small">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory || ''}
          onChange={(e) => handleCategoryChange(e.target.value || null)}
          label="Category"
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <div className="image-container">
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <Tooltip title="Add to Wishlist">
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 1)',
                        },
                      }}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </div>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  onClick={() => navigate(`/product/${product.id}`)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {product.name}
                </Typography>
                <Typography className="price-tag">
                  {product.price.toFixed(2)}
                </Typography>
                <Box className="product-actions">
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(product)}
                    startIcon={<ShoppingCartOutlinedIcon />}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 