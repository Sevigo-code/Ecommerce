import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

interface QuantityButtonProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: 4,
  padding: 8,
  backgroundColor: '#000',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #333',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  '&.Mui-disabled': {
    backgroundColor: '#f5f5f5',
    color: '#bdbdbd',
    border: '1px solid #e0e0e0',
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    textAlign: 'center',
    padding: '8px 0',
    width: '40px',
    fontSize: '1rem',
    fontWeight: 500,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid #000',
      borderRadius: 4,
    },
    '&:hover fieldset': {
      borderColor: '#333',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',
      borderWidth: 1,
    },
  },
});

const QuantityButton = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantityButtonProps) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onQuantityChange(newValue);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <StyledIconButton
        onClick={handleDecrease}
        disabled={quantity <= min}
        size="small"
      >
        <RemoveIcon fontSize="small" />
      </StyledIconButton>
      
      <StyledTextField
        value={quantity}
        onChange={handleChange}
        variant="outlined"
        size="small"
        inputProps={{
          min,
          max,
          type: 'number',
        }}
      />

      <StyledIconButton
        onClick={handleIncrease}
        disabled={quantity >= max}
        size="small"
      >
        <AddIcon fontSize="small" />
      </StyledIconButton>
    </Box>
  );
};

export default QuantityButton; 