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
        <Button variant="contained" onClick={() => dispatch(fetchProducts())}>
          Reintentar
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }} className="fade-in">
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          value={selectedCategory || ''}
          onChange={(e) => handleCategoryChange(e.target.value || null)}
          label="Categoría"
        >
          <MenuItem value="">Todas las categorías</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {products.length === 0 && !loading && !error && (
        <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
          No hay productos disponibles
        </Alert>
      )}

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <Box sx={{ position: 'relative', p: 2, bgcolor: '#f9f9f9' }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'contain',
                    borderRadius: 2,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <Tooltip title="Añadir a favoritos">
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: 'white',
                        boxShadow: 1,
                        '&:hover': {
                          backgroundColor: '#f0f0f0',
                        },
                      }}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  onClick={() => navigate(`/product/${product.id}`)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  fullWidth
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => handleAddToCart(product)}
                >
                  Añadir al carrito
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
