import { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Snackbar
} from '@mui/material';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [popup, setPopup] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }
    try {
      login(form); // real login sets user in AuthContext
      // If redirected from checkout, go back there after login
      navigate(location.state?.from || '/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Guest access handler (no user object created)
  const handleGuestLogin = () => {
    try {
      // Do NOT call login — leave user = null
      navigate('/cart'); // guests can shop, but checkout is blocked
    } catch (err) {
      setPopup('Guest access failed');
    }
  };

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh', p: 2 }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 420 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>

        {/* Show message if redirected from protected route */}
        {location.state?.from === '/checkout' && (
          <Typography color="error" sx={{ mb: 2 }}>
            Please log in to continue to checkout.
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
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            sx={{ mb: 2 }}
          />
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          <Button fullWidth variant="contained" type="submit">Login</Button>
        </Box>

        {/* ✅ Guest access button */}
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={handleGuestLogin}
        >
          Continue as Guest
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          No account? <Link to="/register">Register</Link>
        </Typography>
      </Paper>

      {/* Snackbar for guest errors */}
      <Snackbar
        open={!!popup}
        autoHideDuration={3000}
        onClose={() => setPopup('')}
        message={popup}
      />
    </Box>
  );
};

export default Login;
