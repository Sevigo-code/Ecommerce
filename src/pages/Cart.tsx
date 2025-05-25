import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import ActionButton from '../components/ActionButton';
import QuantityButton from '../components/QuantityButton';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  if (items.length === 0) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" align="center" color="text.secondary">
          🛒 Your Cart is Empty!
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Paper 
              key={item.id} 
              elevation={0} 
              sx={{ 
                mb: 3, 
                p: 2, 
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Box sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5) !important',
                    backdropFilter: 'blur(5px)',
                    p: 2,
                    borderRadius: 2,
                  }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        width: '100%',
                        height: 140,
                        objectFit: 'contain',
                        backgroundColor: 'rgba(255, 255, 255, 0.3) !important',
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={0.5}>
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box mt={2} display="flex" alignItems="center" gap={2}>
                      <QuantityButton
                        quantity={item.quantity}
                        onQuantityChange={(newQuantity) => handleUpdateQuantity(item.id, newQuantity)}
                      />
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveFromCart(item.id)}
                        sx={{
                          border: '1px solid rgba(0, 0, 0, 0.1)',
                          backgroundColor: 'white',
                          '&:hover': {
                            backgroundColor: '#fff0f0',
                            border: '1px solid #ff0000',
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              borderRadius: 3, 
              p: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.7) !important',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle1">Total:</Typography>
                <Typography variant="subtitle1" fontWeight={600}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              <ActionButton
                variant="primary"
                sx={{ mt: 1 }}
              >
                CHECKOUT
              </ActionButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
