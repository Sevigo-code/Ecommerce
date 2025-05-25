import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DevicesIcon from '@mui/icons-material/Devices';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from 'axios';

// Credenciales de demostración que funcionan con reqres.in
const DEMO_EMAIL = 'eve.holt@reqres.in';
const DEMO_PASSWORD = 'cityslicka';
const API_KEY = 'reqres-free-v1';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validar password
    if (password.length < 1) {
      setError('Password is required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios({
        method: 'post',
        url: 'https://reqres.in/api/login',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        data: {
          email: email.trim(),
          password: password.trim()
        }
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err: any) {
      console.error('Login error:', err.response || err);
      if (err.response) {
        // Error de respuesta del servidor
        switch (err.response.status) {
          case 400:
            setError('Invalid email or password format');
            break;
          case 401:
            if (err.response.data?.error === 'Missing API key.') {
              setError('Authentication error. Please try again later.');
              console.error('API Key error:', err.response.data);
            } else {
              setError(`Use these credentials to login:\nEmail: ${DEMO_EMAIL}\nPassword: ${DEMO_PASSWORD}`);
            }
            break;
          default:
            setError('An error occurred. Please try again later');
        }
      } else if (err.request) {
        // Error de red
        setError('Network error. Please check your internet connection');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <DevicesIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              letterSpacing: '-0.5px'
            }}
          >
            Welcome to TechVibe
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to continue shopping
          </Typography>
        </Box>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-message': {
                width: '100%',
                textAlign: 'center',
                whiteSpace: 'pre-line'
              }
            }}
          >
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': {
              mb: 2,
            }
          }}
        >
          <TextField
            fullWidth
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 1, ml: 1 }}>
                  <EmailOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              '& .MuiInputLabel-root': {
                ml: 5
              },
              '& .MuiOutlinedInput-input': {
                pl: 0
              }
            }}
          />
          <TextField
            fullWidth
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 1, ml: 1 }}>
                  <LockOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    size="small"
                    sx={{ mr: 0.5 }}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon fontSize="small" />
                    ) : (
                      <VisibilityOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              '& .MuiInputLabel-root': {
                ml: 5
              },
              '& .MuiOutlinedInput-input': {
                pl: 0
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ 
              mt: 2, 
              mb: 2,
              height: 48,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{
            mt: 2,
            p: 2,
            bgcolor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: 2
          }}
        >
          The demo credentials are pre-filled. Just click Sign In!
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login; 