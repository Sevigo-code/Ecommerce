import { Button, ButtonProps, styled } from '@mui/material';

interface ActionButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary';
}

const StyledActionButton = styled(Button)<{ variant?: 'primary' | 'secondary' }>(({ 
  variant = 'primary' 
}) => ({
  borderRadius: 4,
  textTransform: 'uppercase',
  padding: '14px 24px',
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '1px',
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

const ActionButton = ({ 
  children, 
  variant = 'primary',
  ...props 
}: ActionButtonProps) => {
  return (
    <StyledActionButton 
      variant={variant as any} 
      disableElevation 
      {...props}
    >
      {children}
    </StyledActionButton>
  );
};

export default ActionButton; 