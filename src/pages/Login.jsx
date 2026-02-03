import { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
  Link as MuiLink
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = () => {
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  


  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [popup, setPopup] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }
    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }
    try {
      login(form);
      navigate(location.state?.from || '/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };



const handleGuestLogin = () => {
  guestLogin();
  navigate('/dashboard');   // ✅ go to dashboard instead of cart
};


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 2,
        background: 'linear-gradient(135deg, #70abde 0%, #70abde 100%)',
        position: 'relative'
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)'
        }}
      />

      <Paper
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 450,
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: '50%',
              bgcolor: '#70abde',
              mb: 2
            }}
          >
            <LockIcon sx={{ color: '#fff', fontSize: 32 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: 'linear-gradient(135deg, #70abde 0%, #70abde 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account
          </Typography>
        </Box>

        {location.state?.from && (
          <Alert
            severity="info"
            sx={{
              mb: 3,
              bgcolor: '#e3f2fd',
              color: '#1976d2',
              border: '1px solid #90caf9'
            }}
          >
            Please log in to continue.
          </Alert>
        )}

        <Box component="form" onSubmit={onSubmit}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            sx={{
              mb: 2.5,
              '& .MuiOutlinedInput-root': {
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                '&:hover fieldset': {
                  borderColor: '#70abde'
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 2,
                  borderColor: '#70abde'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#70abde', mr: 1 }} />
                </InputAdornment>
              )
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            sx={{
              mb: 1,
              '& .MuiOutlinedInput-root': {
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                '&:hover fieldset': {
                  borderColor: '#70abde'
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 2,
                  borderColor: '#70abde'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#70abde', mr: 1 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#70abde' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                bgcolor: '#ffebee',
                color: '#c62828',
                border: '1px solid #ef5350'
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.4,
              mt: 2,
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #70abd 0%, #70abd 100%)',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
              }
            }}
          >
            Login
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3, color: 'text.secondary' }}>OR</Divider>

        {/* Guest Login Button */}
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGuestLogin}
          sx={{
            py: 1.3,
            mb: 1.5,
            fontSize: '0.95rem',
            fontWeight: 600,
            textTransform: 'none',
            borderColor: '#70abd',
            color: '#70abd',
            transition: 'all 0.3s',
            '&:hover': {
              borderColor: '#70abde',
              bgcolor: 'rgba(102, 126, 234, 0.08)',
              color: '#70abde'
            }
          }}
        >
          Continue as Guest
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            textAlign: 'center',
            mb: 3,
            fontSize: '0.8rem'
          }}
        >
          Browse and add items without an account
        </Typography>

        {/* Register Link */}
        <Box sx={{ textAlign: 'center', pt: 2, borderTop: '1px solid #eee' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <MuiLink
              component={Link}
              to="/register"
              sx={{
                color: '#667eea',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s',
                '&:hover': {
                  color: '#70abde',
                  textDecoration: 'underline'
                }
              }}
            >
              Sign up here
            </MuiLink>
          </Typography>
        </Box>
      </Paper>

      {/* Snackbar for errors */}
      <Snackbar
        open={!!popup}
        autoHideDuration={3000}
        onClose={() => setPopup('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setPopup('')} sx={{ width: '100%' }}>
          {popup}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
