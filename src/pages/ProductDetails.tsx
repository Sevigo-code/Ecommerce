import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  Box,
  Chip,
} from '@mui/material';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import ActionButton from '../components/ActionButton';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  if (!product) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" color="error" align="center" gutterBottom>
          Product not found
        </Typography>
        <Box display="flex" justifyContent="center">
          <ActionButton
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </ActionButton>
        </Box>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
            backdropFilter: 'blur(8px)',
            borderRadius: 3,
          }}>
            <Box sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.5) !important',
              backdropFilter: 'blur(5px)',
              p: 2,
            }}>
              <CardMedia
                component="img"
                height="400"
                image={product.image}
                alt={product.name}
                sx={{ 
                  objectFit: 'contain',
                  backgroundColor: 'rgba(255, 255, 255, 0.3) !important',
                }}
              />
            </Box>
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
            backdropFilter: 'blur(8px)',
            p: 4, 
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>

            {/* Category Breadcrumb */}
            <Box sx={{ my: 2 }}>
              <Chip 
                label={product.category} 
                color="secondary"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.6) !important',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  color: 'text.primary',
                }} 
              />
            </Box>

            {/* Description */}
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Description:
            </Typography>
            <Typography variant="body2" paragraph>
              {product.description || 'No description available'}
            </Typography>

            {/* Stock */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Stock:
                <strong
                  style={{
                    color: product.stock > 0 ? 'green' : 'red',
                    marginLeft: 8,
                  }}
                >
                  {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
                </strong>
              </Typography>
            </Box>

            {/* Add to Cart Button */}
            <ActionButton
              variant="primary"
              onClick={handleAddToCart}
              sx={{ mt: 3 }}
              disabled={product.stock === 0}
            >
              ADD TO CART
            </ActionButton>
            
            <ActionButton
              variant="secondary"
              onClick={() => navigate('/cart')}
              sx={{ mt: 2 }}
            >
              BUY NOW
            </ActionButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
