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
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh', p: 2 }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 420 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>

        {location.state?.from && (
          <Typography color="error" sx={{ mb: 2 }}>
            Please log in to continue.
          </Typography>
        )}

        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button fullWidth variant="contained" type="submit">Login</Button>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={handleGuestLogin}
        >
          Continue as Guest
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Guests can browse and add items, but checkout requires login.
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          No account? <Link to="/register">Register</Link>
        </Typography>
      </Paper>

      {/* Snackbar for guest errors */}
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
