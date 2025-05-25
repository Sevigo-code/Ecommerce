import { Button, ButtonProps, styled } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary';
}

const StyledButton = styled(Button)<CustomButtonProps>(({ theme, variant = 'primary' }) => ({
  borderRadius: 4,
  textTransform: 'none',
  padding: '12px 24px',
  fontSize: '0.9rem',
  fontWeight: 500,
  letterSpacing: '0.5px',
  transition: 'all 0.2s ease-in-out',
  width: '100%',
  fontFamily: "'Helvetica Neue', sans-serif",

  ...(variant === 'primary' && {
    backgroundColor: '#000',
    color: '#fff',
    border: '1px solid #000',
    '&:hover': {
      backgroundColor: '#333',
      color: '#fff',
      border: '1px solid #333',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
  }),

  ...(variant === 'secondary' && {
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #e0e0e0',
    '&:hover': {
      backgroundColor: '#000',
      color: '#fff',
      border: '1px solid #000',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
  }),

  '&.Mui-disabled': {
    backgroundColor: '#f5f5f5',
    color: '#bdbdbd',
    border: '1px solid #e0e0e0',
  },
}));

const CustomButton = ({ children, variant = 'primary', ...props }: CustomButtonProps) => {
  return (
    <StyledButton variant={variant as any} disableElevation {...props}>
      {children}
    </StyledButton>
  );
};

export default CustomButton; 